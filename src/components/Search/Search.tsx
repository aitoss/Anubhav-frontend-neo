"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSimilarBlogs } from "../../hooks/useSearch";
import ShortcutIcon from "./ShortcutIcon";

const Search = ({ mode, focus, full }: any) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState<boolean>(full);
  const [searchText, setSearchText] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use React Query for similar blogs
  const { data: similarBlogsData } = useSimilarBlogs(
    searchText.length > 2 ? { q: searchText } : undefined
  );

  // Memoize popular searches from similar blogs
  const popularSearches = useMemo(() => {
    if (searchText.length > 2 && similarBlogsData) {
      return similarBlogsData.map((item: any) => item.title);
    }
    return ["Google", "Microsoft"];
  }, [searchText, similarBlogsData]);

  // ✅ Load recent searches from localStorage safely on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recentSearches");
      const storedSearches = stored ? JSON.parse(stored) : [];
      setRecentSearches(storedSearches);
    }
  }, []);

  // Memoize event handlers
  const handleKeyDown = useCallback((event: any) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      setIsExpanded(true);
      inputRef.current?.focus();
    }
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).closest(".recent-searches")
    ) {
      setIsExpanded(false);
    }
  }, []);

  useEffect(() => {
    if (focus && inputRef.current) inputRef.current.focus();

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [focus, handleKeyDown, handleClickOutside]);

  const handleSearchSubmit = useCallback((event?: React.FormEvent | KeyboardEvent) => {
    event?.preventDefault();
    if (searchText.trim() === "") return;

    let updatedSearches = recentSearches.filter(item => item !== searchText);
    updatedSearches.push(searchText);
    const limitedSearches = updatedSearches.slice(-10);
    setRecentSearches(limitedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));

    inputRef.current?.blur();
    router.push(`/search?query=${encodeURIComponent(searchText)}`);
    setIsExpanded(false);
  }, [searchText, recentSearches, router]);

  const directSearchFunction = useCallback((term: string) => {
    if (!term.trim()) return;
    const updatedSearches = [...recentSearches, term].slice(-10);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    inputRef.current!.value = term;
    inputRef.current!.blur();
    router.push(`/search?query=${encodeURIComponent(term)}`);
    setIsExpanded(false);
  }, [recentSearches, router]);

  const handleRemove = useCallback((index: number) => {
    const updatedSearches = recentSearches.filter((_, i) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  }, [recentSearches]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  }, []);

  const handleClose = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
    }
  }, [handleSearchSubmit]);

  const handleSuggestionClick = useCallback((company: any) => {
    directSearchFunction(company);
  }, [directSearchFunction]);

  // Memoize CSS classes based on mode
  const cssClasses = useMemo(() => ({
    containerClass: mode === "dark"
      ? "bg-[#121212] text-[#ffffffcc] rounded-xl"
      : "bg-[#fff] text-[#212121] h-8 rounded-lg",
    borderClass: mode === "dark" ? "border-[#27272a]" : "border-[#d9d9d9]",
    inputBgClass: mode === "dark" ? "bg-[#121212] h-[2.5rem]" : "bg-[#fff] h-full",
    bgClass: mode === "dark" ? "bg-[#212121] size-8 rounded-lg" : "bg-[#f8f8f8] size-6 rounded-sm",
    inputTextClass: mode === "dark"
      ? "text-[#ffffffcc] placeholder:text-[rgba(255,255,255,0.6)]"
      : "text-[#212121] placeholder:text-[rgba(0,0,0,0.4)] placeholder:font-[500]",
    placeholderClass: mode === "dark"
      ? "placeholder:text-[rgba(255,255,255,0.6)]"
      : "placeholder:text-[#818181]",
    hoverClass: mode === "dark" ? "hover:bg-[#27272a]" : "hover:bg-[#f8f8f8]",
    textClass: mode === "dark" ? "text-[#a1a1aa]/50" : "text-[#a1a1aa]",
    popularSearchClass: mode === "dark"
      ? "bg-[#121212] text-[#ffffffbb] top-[43px]"
      : "bg-[#fff] text-[#212121] top-[31px]",
  }), [mode]);

  // Memoize popular searches list
  const popularSearchesList = useMemo(() => (
    popularSearches.map((company: any, index: number) => (
      <div
        className={`flex w-full flex-row items-center justify-between ${cssClasses.hoverClass}`}
        key={index}
      >
        <div
          className="flex w-full cursor-pointer items-center justify-start gap-2.5 px-2 py-2 pl-4"
          onClick={() => handleSuggestionClick(company)}
        >
          <svg
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.39999 17.3H11.2C15.2 17.3 16.8 15.7 16.8 11.7V6.90005C16.8 2.90005 15.2 1.30005 11.2 1.30005H6.39999C2.39999 1.30005 0.799988 2.90005 0.799988 6.90005V11.7C0.799988 15.7 2.39999 17.3 6.39999 17.3Z"
              stroke="#9a9a9a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4.96002 11.8441L6.86402 9.37211C7.13602 9.02011 7.64002 8.95611 7.99202 9.22811L9.45602 10.3801C9.80802 10.6521 10.312 10.5881 10.584 10.2441L12.432 7.86011"
              stroke="#9a9a9a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {company}
        </div>
      </div>
    ))
  ), [popularSearches, cssClasses.hoverClass, handleSuggestionClick]);

  // Memoize recent searches list
  const recentSearchesList = useMemo(() => (
    recentSearches
      .slice(0)
      .reverse()
      .map((search: any, index) => (
        <div
          className={`flex w-full flex-row items-center justify-between px-4 ${cssClasses.hoverClass}`}
          key={index}
        >
          <div
            className="flex w-full cursor-pointer items-center justify-start gap-2 py-2"
            onClick={() => handleSuggestionClick(search)}
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#9a9a9a"
            >
              <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
            </svg>
            <div className="flex-grow truncate">{search}</div>
          </div>
          <span
            className="hover:cursor-pointer hover:underline"
            onClick={() => handleRemove(recentSearches.length - index - 1)}
          >
            <X size={16} />
          </span>
        </div>
      ))
  ), [recentSearches, cssClasses.hoverClass, handleSuggestionClick, handleRemove]);

  return (
    <>
      <div className="relative flex flex-col">
        <div
          className={`search flex border-[1.5px] px-[4px] py-[1px] ${cssClasses.containerClass} ${cssClasses.borderClass} items-center justify-center gap-1`}
        >
          <div
            onClick={handleSearchSubmit}
            className={`border-[1.5px] ${cssClasses.borderClass} ${cssClasses.bgClass} flex cursor-pointer items-center justify-center p-1`}
          >
            <SearchIcon className="size-4" />
          </div>
          <form onSubmit={handleSearchSubmit}>
            <input
              ref={inputRef}
              id="search-input"
              className={`${cssClasses.inputBgClass} ${cssClasses.inputTextClass} w-full border-none px-3 font-[300] outline-none placeholder:font-[400] focus:outline-none placeholder:focus:border-none placeholder:focus:text-[rgba(255,255,255,0.8)] placeholder:focus:outline-none placeholder:text-sm lg:w-[400px] ${cssClasses.placeholderClass}`}
              type=""
              placeholder="Search for your Dreams.."
              value={searchText}
              onKeyDown={handleClose}
              onChange={handleChange}
              onClick={() => setIsExpanded(true)}
            />
          </form>
          <div
            className={`border-[1.5px] ${cssClasses.borderClass} ${cssClasses.bgClass} w-12 flex cursor-pointer items-center justify-center p-1`}
          >
            <ShortcutIcon />
          </div>
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.1 }}
              className={`absolute z-50 flex flex-col overflow-hidden text-sm font-[300] ${cssClasses.popularSearchClass} recent-searches w-full border-[1.5px] ${cssClasses.borderClass} items-center justify-start rounded-xl shadow-md shadow-[rgba(0,0,0,0.05)]`}
            >
              <div className="flex w-full flex-col items-center justify-center">
                <div
                  className={`w-full overflow-hidden pb-1 pl-4 pt-2 font-[400] tracking-wider ${cssClasses.textClass}`}
                >
                  Popular Searches
                </div>
                <div className={`h-[1px] w-full ${cssClasses.hoverClass}`}></div>
                {popularSearchesList}
              </div>
              {recentSearches.length === 0 ? (
                <div
                  className={`flex w-full flex-row items-center justify-center px-2 py-2 ${cssClasses.textClass}`}
                >
                  No recent searches
                </div>
              ) : (
                <>
                  <div
                    className={`w-full overflow-hidden px-4 pb-1 pt-2 font-[400] tracking-wider ${cssClasses.textClass}`}
                  >
                    Recent Searches
                  </div>
                  <div className={`h-[1px] w-[480px] ${cssClasses.hoverClass}`}></div>
                  {recentSearchesList}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Search;

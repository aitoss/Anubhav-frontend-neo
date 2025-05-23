import { AnimatePresence, motion } from "framer-motion";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { X } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../constants";
import ShortcutIcon from "./ShortcutIcon";

const Search = ({ mode, focus, full }: any) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(full);
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentSearches");
    const storedSearches = stored ? JSON.parse(stored) : [];
    setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    if (focus) {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
    const handleKeyDown = (event: any) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
        setIsExpanded(true);
      }
    };

    const handleClickOutside = (event: any) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        !event.target.closest(".recent-searches")
      ) {
        setIsExpanded(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (event: any) => {
    if (searchText.trim() !== "") {
      let updatedSearches;
      if (recentSearches.includes(searchText)) {
        updatedSearches = recentSearches.filter(
          (item: any) => item !== searchText,
        );
        updatedSearches.push(searchText);
      } else {
        updatedSearches = [...recentSearches, searchText];
      }

      const limitedSearches = updatedSearches.slice(-10);
      setRecentSearches(limitedSearches);

      localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));

      if (inputRef.current) {
        inputRef.current.value = searchText;
        inputRef.current.blur();
      }
      navigate("/search?query=" + searchText);
    }
  };

  const directSearchFunction = (company: any) => {
    if (company.trim() !== "") {
      const updatedSearches = [...recentSearches, company];
      const limitedSearches = updatedSearches.slice(-10);
      setRecentSearches(limitedSearches);
      // setSearchText("");
      // focus out
      if (inputRef.current) {
        inputRef.current.value = company;
        inputRef.current.blur();
      }
      navigate("/search?query=" + company);
      setIsExpanded(false);
    }
  };

  const handleClose = (event: any) => {
    if (event.key === "Enter") {
      setIsExpanded(false);
      handleSearchSubmit(event);
    } else if (
      // TODO: what is this for ?
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      !event.target.closest(".recent-searches")
    ) {
      setIsExpanded(false);
    }
  };

  const fetchSuggestions = useCallback(
    throttle(async (searchText: any) => {
      try {
        const response = await fetch(
          BACKEND_URL + `/similarBlogs?q=${searchText}`,
        );
        const data = await response.json();
        const suggestionTitles = data.map((item: any) => {
          return item.title;
        });
        setPopularSearches(suggestionTitles);
      } catch (err) {
        console.log("Failed to fetch suggestions");
      }
    }, 1000), // Throttle the API call to once per second
    [],
  );

  const debouncedFetchSuggestions = useCallback(
    debounce((searchText: any) => {
      fetchSuggestions(searchText);
    }, 300), // Debounce the input by 300ms
    [fetchSuggestions],
  );

  useEffect(() => {
    if (searchText.length > 2) {
      debouncedFetchSuggestions(searchText);
    } else {
      setPopularSearches(["Google", "Microsoft"]);
    }
  }, [searchText, debouncedFetchSuggestions]);

  const handleChange = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleSuggestionClick = (company: any) => {
    directSearchFunction(company);
  };

  const handleRemove = (index: any) => {
    const updatedSearches = recentSearches.filter((_: any, i) => i !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const containerClass =
    mode === "dark"
      ? "bg-[#121212] text-[#ffffffcc]"
      : "bg-[#fff] text-[#212121]";
  const borderClass = mode === "dark" ? "border-[#27272a]" : "border-[#d9d9d9]";
  const inputBgClass = mode === "dark" ? "bg-[#121212]" : "bg-[#fff]";
  const bgClass = mode === "dark" ? "bg-[#212121]" : "bg-[#f8f8f8]";
  const inputTextClass =
    mode === "dark"
      ? "text-[#ffffffcc] placeholder:text-[rgba(255,255,255,0.6)]"
      : "text-[#212121] placeholder:text-[rgba(0,0,0,0.4)] placeholder:font-[500]";
  const placeholderClass =
    mode === "dark"
      ? "placeholder:text-[rgba(255,255,255,0.6)]"
      : "placeholder:text-[#818181]";
  const hoverClass =
    mode === "dark" ? "hover:bg-[#27272a]" : "hover:bg-[#f8f8f8]";
  const textClass = mode === "dark" ? "text-[#a1a1aa]/50" : "text-[#a1a1aa]";
  const popularSearchClass =
    mode === "dark"
      ? "bg-[#121212] text-[#ffffffbb]"
      : "bg-[#fff] text-[#212121]";

  return (
    <>
      <div className="relative flex flex-col">
        <div
          className={`search flex border-[1.5px] px-[4px] py-[1px] ${containerClass} ${borderClass} items-center justify-center gap-1 rounded-xl`}
        >
          <div
            onClick={handleSearchSubmit}
            className={`h-[32px] w-[32px] border-[1.5px] ${borderClass} ${bgClass} flex cursor-pointer items-center justify-center rounded-lg p-1`}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8333 28.6509C22.8289 28.6509 28.5 22.9798 28.5 15.9842C28.5 8.9886 22.8289 3.31754 15.8333 3.31754C8.83769 3.31754 3.16663 8.9886 3.16663 15.9842C3.16663 22.9798 8.83769 28.6509 15.8333 28.6509Z"
                stroke="#b9b9b9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M29.8333 29.9842L27.1666 27.3175"
                stroke="#b9b9b9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <form onSubmit={handleSearchSubmit}>
            <input
              ref={inputRef}
              id="search-input"
              className={`${inputBgClass} ${inputTextClass} h-[2.5rem] w-[400px] border-none px-3 font-[300] outline-none placeholder:font-[300] focus:outline-none placeholder:focus:border-none placeholder:focus:text-[rgba(255,255,255,0.8)] placeholder:focus:outline-none lg:w-[500px] x-sm:w-[300px] ${placeholderClass}`}
              type=""
              placeholder="Search for your Dreams.."
              value={searchText}
              onKeyDown={handleClose}
              onChange={handleChange}
              onClick={() => setIsExpanded(true)}
            />
          </form>
          <div
            className={`border-[1.5px] ${borderClass} ${bgClass} flex h-[32px] items-center justify-center rounded-md p-1 px-0.5 font-[400] text-[#b9b9b9]`}
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
              className={`absolute top-[43px] z-50 flex flex-col overflow-hidden text-sm font-[300] ${popularSearchClass} recent-searches w-full border-[1.5px] ${borderClass} items-center justify-start rounded-xl shadow-md shadow-[rgba(0,0,0,0.05)]`}
            >
              <div className="flex w-full flex-col items-center justify-center">
                <div
                  className={`w-full overflow-hidden pb-1 pl-4 pt-2 font-[400] tracking-wider ${textClass}`}
                >
                  Popular Searches
                </div>
                <div className={`h-[1px] w-full ${hoverClass}`}></div>
                {popularSearches.map((company: any, index) => (
                  <div
                    className={`flex w-full flex-row items-center justify-between ${hoverClass}`}
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
                ))}
              </div>
              {recentSearches.length === 0 ? (
                <div
                  className={`flex w-full flex-row items-center justify-center px-2 py-2 ${textClass}`}
                >
                  No recent searches
                </div>
              ) : (
                <>
                  <div
                    className={`w-full overflow-hidden px-4 pb-1 pt-2 font-[400] tracking-wider ${textClass}`}
                  >
                    Recent Searches
                  </div>
                  <div className={`h-[1px] w-[480px] ${hoverClass}`}></div>
                  {recentSearches
                    .slice(0)
                    .reverse()
                    .map((search: any, index) => (
                      <div
                        className={`flex w-full flex-row items-center justify-between px-4 ${hoverClass}`}
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
                          onClick={() =>
                            handleRemove(recentSearches.length - index - 1)
                          }
                        >
                          <X size={16} />
                        </span>
                      </div>
                    ))}
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

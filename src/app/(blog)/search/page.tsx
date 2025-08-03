"use client";

import BlogCard from "@/components/BlogSection/BlogCard";
import Filter from "@/components/Filter/Filter";
import FilterPopUp from "@/components/Filter/FilterPopUp";
import NavbarMini from "@/components/Navbar/NavbarMini";
import SearchCardLoading from "@/components/Search/SearchCardLoading";
import { useSearchParams } from "next/navigation";
import companyLogo from "public/assets/images/company.png";
import { useEffect, useRef, useState } from "react";
import { apiService } from "../../../lib/api";
import { ReadTime, formatDate } from "../../../services/date";

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");

    const [articles, setArticles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [company, setCompany] = useState<any[]>([]);
    const [headerName, setHeaderName] = useState<string>("");
    const [isSearching, setIsSearching] = useState(false);
    const [totalArticles, setTotalArticles] = useState<number>(0);
    const [filterPopUp, setFilterPopUp] = useState(false);

    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const openFilterPopup = () => setFilterPopUp(true);
    const closeFilterPopUp = () => setFilterPopUp(false);

    const fetchLatestArticles = async (page = 1) => {
        setLoading(true);
        try {
            const res = await apiService.getBlogs(page);
            const data = res.articles;
            setTotalArticles(res.totalArticles);

            if (page === 1) setArticles(data);
            else setArticles((prev) => [...prev, ...data]);

            setHasMore(res.hasMore);
        } catch (error) {
            console.error("Failed to fetch articles", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchArticles = async (query: string, page: number) => {
        setLoading(true);
        try {
            const res = await apiService.searchBlogs(query, page, 10);

            const newArticles = res.articles;
            setTotalArticles(res.totalArticles);

            if (page === 1) setArticles(newArticles);
            else setArticles((prev) => [...prev, ...newArticles]);

            setHasMore(newArticles.length === 10);
        } catch (error) {
            console.error("Failed to fetch search articles", error);
        } finally {
            setLoading(false);
        }
    };

    const countCompany = async () => {
        try {
            const res = await apiService.getCompanies();
            setCompany(res.data);
        } catch (error) {
            console.error("Failed to count companies", error);
        }
    };

    const handleShowMore = () => {
        if (query) fetchArticles(query, page + 1);
        else fetchLatestArticles(page + 1);
        setPage((prev) => prev + 1);
    };

    useEffect(() => {
        countCompany();
    }, []);

    useEffect(() => {
        if (!query) {
            setIsSearching(false);
            fetchLatestArticles(1);
        } else {
            setIsSearching(true);
            setArticles([]);
            setPage(1);
            fetchArticles(query, 1);
        }
    }, [query]);

    useEffect(() => {
        if (!loadMoreRef.current || !hasMore) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) handleShowMore();
        }, { threshold: 1.0 });

        observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
        };
    }, [loadMoreRef.current, hasMore]);

    return (
        <>
            {filterPopUp && (
                <FilterPopUp
                    closeFilterPopUp={closeFilterPopUp}
                    company={company}
                    fetchArticles={fetchArticles}
                    setHeaderName={setHeaderName}
                />
            )}
            <div className="h-full max-w-7xl mx-auto px-4 md:px-8 pt-8">
                <div className="flex h-full w-full gap-10">
                    <div className="flex h-full w-full max-w-5xl flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-2xl font-medium">
                                {!isSearching
                                    ? "Recent Stories"
                                    : `${totalArticles} Articles found for ${headerName || decodeURIComponent(query ?? "")}`}
                            </h3>
                            <svg
                                onClick={openFilterPopup}
                                className="md:hidden h-7 w-7 cursor-pointer rounded-md border border-[#c1c1c1] p-[2px] transition-all hover:border-[#919191] block"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M5.4 2.1h13.2c1.1 0 2 .9 2 2v2.2c0 .8-.5 1.8-1 2.3L15.3 12.4c-.6.5-1 1.5-1 2.3v4.3c0 .6-.4 1.4-.9 1.7l-1.4.9c-1.3.8-3.1-.1-3.1-1.7v-5.3c0-.7-.4-1.6-.8-2.1L4.3 8.5c-.5-.5-.9-1.4-.9-2V4.2c0-1.1.9-2.1 2-2.1z"
                                    stroke="#616161"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M10.93 2.1 6 10"
                                    stroke="#616161"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        {loading && articles.length === 0 ? (
                            [...Array(5)].map((_, i) => <SearchCardLoading key={i} />)
                        ) : (
                            articles.map((item) => (
                                <BlogCard
                                    key={item._id}
                                    id={item._id}
                                    link={`/blog/${item._id}`}
                                    Title={item.title}
                                    imagesrc={
                                        item.imageUrl === "your_image_url_here"
                                            ? companyLogo
                                            : item.imageUrl
                                    }
                                    author={item.author?.name}
                                    company={item.companyName}
                                    description={item.description}
                                    readingTime={ReadTime(item.description)}
                                    date={formatDate(item.createdAt)}
                                />
                            ))
                        )}

                        {hasMore && !loading && (
                            <div
                                ref={loadMoreRef}
                                className="text-center py-8 text-[#212121]"
                            >
                                Loading more...
                            </div>
                        )}

                        {loading && articles.length > 0 && <SearchCardLoading />}
                        <br />
                        <br />
                    </div>

                    <div className="section-right md:flex w-1/5 flex-col gap-2 hidden">
                        <Filter
                            company={company}
                            fetchArticles={fetchArticles}
                            setHeaderName={setHeaderName}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SearchPage;

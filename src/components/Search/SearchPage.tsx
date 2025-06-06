import React, { useState, useEffect, useRef } from "react";
import NavbarMini from "../Navbar/NavbarMini";
import BlogCard from "../BlogSection/BlogCard";
import "./SearchPage.css";
import FilterPopUp from "../Filter/FilterPopUp";
import Filter from "../Filter/Filter";
import axios from "axios";
import { BACKEND_URL } from "../../constants";
import { useSearchParams } from "react-router-dom";
import companyLogo from "public/assets/images/company.png";
import { ReadTime, formatDate } from "../../services/date";
import SearchCardLoading from "./SearchCardLoading";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>("");
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [company, setCompany] = useState<any[]>([]);
  const [headerName, setHeaderName] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [totalArticles, setTotalArticles] = useState<number>(0);

  const [filterPopUp, setFilterPopUp] = useState<boolean>(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const openFilterPopup = () => {
    setFilterPopUp(true);
  };

  const closeFilterPopUp = () => {
    setFilterPopUp(false);
  };

  const fetchLatestArticles = async (endPoint: any, page = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}${endPoint}?page=${page}`);
      const data = res.data.articles;
      setTotalArticles(res.data.totalArticles);

      if (page === 1) {
        setArticles(data);
      } else {
        setArticles((prevArticles: any) => [...prevArticles, ...data]);
      }

      setHasMore(res.data.hasMore);
    } catch (error) {
      console.log("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async (query: any, page: number) => {
    setLoading(true);
    const params = { q: query, page, limit: 10 };
    console.log("params", params);

    try {
      const response = await axios.get(BACKEND_URL + "/search", { params });
      const newArticles = response.data.articles;
      setTotalArticles(response.data.totalArticles);

      if (page === 1) {
        setArticles([...newArticles]);
      } else {
        setArticles((prevArticles: any) => [...prevArticles, ...newArticles]);
      }

      setHasMore(newArticles.length === 10);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  };

  const countCompany = async () => {
    try {
      const res = await axios.get(BACKEND_URL + "/countCompanies");
      setCompany(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    countCompany();
  }, []);

  useEffect(() => {
    const query = searchParams.get("query");
    setIsSearching(!!query);

    if (query) {
      setArticles([]);
      setPage(1);
      fetchArticles(query, 1);
    } else {
      fetchLatestArticles("/blogs");
    }
  }, [searchParams]);

  const handleShowMore = () => {
    const query = searchParams.get("query");
    if (query) {
      fetchArticles(query, page + 1);
    } else {
      fetchLatestArticles("/blogs", page);
    }
    setPage((prevPage: any) => prevPage + 1);
  };

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries: any) => {
        if (entries[0].isIntersecting) {
          handleShowMore();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(loadMoreRef.current);

    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [hasMore, loadMoreRef.current]);

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
      <NavbarMini />
      <div className="h-full px-8 pt-24 md:px-4 lg:px-14 2xl:px-28">
        <div className="flex h-full w-full gap-10">
          <div className="section-left flex h-full w-full max-w-5xl flex-col gap-2">
            <div className="flex w-full items-center justify-between">
              <h3 className="text-2xl font-[500]">
                {!isSearching
                  ? "Recent Stories"
                  : `${totalArticles} Articles found for ${
                      headerName
                        ? headerName
                        : decodeURIComponent(
                            searchParams
                              .toString()
                              .substring(6)
                              .replace(/\+/g, " "),
                          )
                    }`}
              </h3>
              <svg
                onClick={() => openFilterPopup()}
                className="hidden h-7 w-7 cursor-pointer rounded-lg border border-[#c1c1c1] p-[2px] transition-all hover:border-[#919191] md:block"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.3999 2.1001H18.5999C19.6999 2.1001 20.5999 3.0001 20.5999 4.1001V6.3001C20.5999 7.1001 20.0999 8.1001 19.5999 8.6001L15.2999 12.4001C14.6999 12.9001 14.2999 13.9001 14.2999 14.7001V19.0001C14.2999 19.6001 13.8999 20.4001 13.3999 20.7001L11.9999 21.6001C10.6999 22.4001 8.8999 21.5001 8.8999 19.9001V14.6001C8.8999 13.9001 8.4999 13.0001 8.0999 12.5001L4.2999 8.5001C3.7999 8.0001 3.3999 7.1001 3.3999 6.5001V4.2001C3.3999 3.0001 4.2999 2.1001 5.3999 2.1001Z"
                  stroke="#616161"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.93 2.1001L6 10.0001"
                  stroke="#616161"
                  strokeWidth="1.5"
                  strokeMiterlimit="10"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {loading && articles.length === 0 ? (
              <>
                <SearchCardLoading />
                <SearchCardLoading />
                <SearchCardLoading />
                <SearchCardLoading />
                <SearchCardLoading />
              </>
            ) : (
              articles.map((item: any) => (
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
                  data={item.description}
                  readingTime={ReadTime(item.description)}
                  date={formatDate(item.createdAt)}
                />
              ))
            )}

            {hasMore && !loading && (
              <div
                ref={loadMoreRef}
                className="group flex h-full w-full cursor-pointer flex-col items-center justify-center pb-8 pt-4 text-[#212121]"
              >
                Loading more...
              </div>
            )}

            {loading && articles.length > 0 && <SearchCardLoading />}
            <br />
            <br />
          </div>
          <div className="section-right flex w-1/5 flex-col gap-2 md:hidden">
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

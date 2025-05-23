import React, { useEffect, useState } from "react";
import NavbarMini from "../../components/Navbar/NavbarMini";
import SearchCardLoading from "../../components/Search/SearchCardLoading";
import { BACKEND_URL } from "../../constants";
import axios from "axios";
import BlogCard from "../../components/BlogSection/BlogCard";
import { ReadTime, formatDate } from "../../services/date";
import { Flag } from "lucide-react";
import Filter from "../../components/Filter/Filter";
import FilterPopUp from "../../components/Filter/FilterPopUp";
import companyLogo from "public/assets/images/company.png";

const Stories = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("Recent");
  const [company, setCompany] = useState([]);
  const [filterPopUp, setFilterPopUp] = useState(false);
  const [headerName, setHeaderName] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const openFilterPopup = () => setFilterPopUp(true);
  const closeFilterPopUp = () => setFilterPopUp(false);

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

  const fetchLatestArticles = async (endPoint: any, page: any) => {
    setLoading(true);
    try {
      const res = await axios.get(`${BACKEND_URL}${endPoint}?page=${page}`);
      const data = res.data.articles;

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

  useEffect(() => {
    let endPoint = "/blogs";
    fetchLatestArticles(endPoint, page);
  }, [page, activeTab]);

  const loadMore = () => {
    if (hasMore) setPage((prevPage: any) => prevPage + 1);
  };

  return (
    <>
      {filterPopUp && (
        <FilterPopUp closeFilterPopUp={closeFilterPopUp} company={company} />
      )}
      <NavbarMini />
      <div className="h-full pt-24 md:px-4 lg:px-14 2xl:px-28">
        <div className="flex h-full w-full justify-center gap-10">
          <div className="section-left flex h-full w-full max-w-5xl flex-col gap-5">
            {/* <div className="flex  justify-around border-b-1 border-gray-300 md:w-full">
              <div
                className={`${activeTab === "Recent" ? "-mb-[2px] border-b-2 border-black" : ""} hover:bg-secondary relative flex cursor-pointer justify-center p-1 text-xl transition duration-300`}
                onClick={() => setActiveTab("Recent")}
              >
                Recent Stories
              </div>
            </div> */}
            <div className="flex w-full items-center justify-between">
              {/* <svg
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
              </svg> */}
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
                  id={item._id} // Pass the id to BlogCard
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
            {loading && articles.length > 0 && <SearchCardLoading />}

            {hasMore && !loading && (
              <div
                onClick={loadMore}
                className="group flex h-full w-full cursor-pointer flex-col items-center justify-center pb-8 pt-4 text-[#212121]"
              >
                Show More
                <svg
                  className="rotate-90 transition-all duration-300 group-hover:translate-y-2"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.42999 4L15.5 10.07L9.42999 16.14"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 10.0699L15 10.0699"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
          {/* <div className="section-right md:hidden w-1/5 flex flex-col gap-2">
            <Filter company={company} fetchLatestArticles={fetchLatestArticles} setHeaderName={setHeaderName} />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Stories;

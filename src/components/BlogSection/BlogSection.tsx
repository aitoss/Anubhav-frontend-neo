import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import BlogCardLoading from "./BlogCardLoading";
import company from "public/assets/images/company.png";

import { apiService } from "../../lib/api";
import { ReadTime, formatDate } from "../../services/date";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogData = async () => {
    try {
      const response = await apiService.getLatestBlogs();
      setBlogData(response);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-0 w-full flex flex-col items-center max-w-[1540px]">
      <AnimatedHeading />
      <div className="w-[70%] p-4 lg-xl:w-[100%] flex flex-col gap-10">
        {loading ? (
          <>
            <BlogCardLoading />
            <BlogCardLoading />
            <BlogCardLoading />
            <BlogCardLoading />
            <BlogCardLoading />
          </>
        ) : (
          blogData.map((item: any) => (
            <AnimatedBlogCard
              key={item._id}
              id={item._id}
              link={`/blog/${item._id}`}
              Title={item.title}
              imagesrc={item.imageUrl === "your_image_url_here" ? company : item.imageUrl}
              author={item.author?.name}
              company={item.companyName}
              readingTime={ReadTime(item.description)}
              date={formatDate(item.createdAt)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const AnimatedBlogCard = ({
  id,
  link,
  Title,
  imagesrc,
  author,
  company,
  readingTime,
  date
}: any) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
    >
      <BlogCard
        id={id}
        link={link}
        Title={Title}
        imagesrc={imagesrc}
        author={author}
        company={company}
        readingTime={readingTime}
        date={date}
      />
    </motion.div>
  );
};

const AnimatedHeading = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
      className="text-[#212121] font-[500] pb-10 x-sm:text-4xl"
    >
      Trending Stories
    </motion.h1>
  );
}

export default BlogSection;
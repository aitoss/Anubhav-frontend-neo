import { useMemo, useCallback } from "react";
import BlogCard from "./BlogCard";
import BlogCardLoading from "./BlogCardLoading";
import company from "public/assets/images/company.png";
import { useLatestBlogs } from "../../hooks/useBlogs";
import { ReadTime, formatDate } from "../../services/date";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const BlogSection = () => {
  const { data: blogData, isLoading, error } = useLatestBlogs();

  // Memoize the processed blog data
  const processedBlogData = useMemo(() => {
    if (!blogData) return [];
    return blogData.map((item: any) => ({
      ...item,
      readingTime: ReadTime(item.description),
      date: formatDate(item.createdAt),
      imagesrc: item.imageUrl === "your_image_url_here" ? company : item.imageUrl,
    }));
  }, [blogData]);

  // Memoize the loading skeleton
  const loadingSkeleton = useMemo(() => (
    <>
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
      <BlogCardLoading />
    </>
  ), []);

  // Memoize the blog cards
  const blogCards = useMemo(() => {
    return processedBlogData.map((item: any) => (
      <AnimatedBlogCard
        key={item._id}
        id={item._id}
        link={`/blog/${item._id}`}
        Title={item.title}
        imagesrc={item.imagesrc}
        author={item.author?.name}
        company={item.companyName}
        readingTime={item.readingTime}
        date={item.date}
      />
    ));
  }, [processedBlogData]);

  if (error) {
    return (
      <div className="p-0 w-full flex flex-col items-center max-w-[1540px]">
        <AnimatedHeading />
        <div className="w-[70%] p-4 lg-xl:w-[100%] flex flex-col gap-10">
          <div className="text-center text-red-500">
            Failed to load blogs. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-0 w-full flex flex-col items-center max-w-[1540px]">
      <AnimatedHeading />
      <div className="w-[70%] p-4 lg-xl:w-[100%] flex flex-col gap-10">
        {isLoading ? loadingSkeleton : blogCards}
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

  const handleAnimation = useCallback(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Memoize the animation variants
  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }), []);

  // Memoize the BlogCard props
  const blogCardProps = useMemo(() => ({
    id,
    link,
    Title,
    imagesrc,
    author,
    company,
    readingTime,
    date
  }), [id, link, Title, imagesrc, author, company, readingTime, date]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.3 }}
      onAnimationStart={handleAnimation}
    >
      <BlogCard {...blogCardProps} />
    </motion.div>
  );
};

const AnimatedHeading = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleAnimation = useCallback(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Memoize the animation variants
  const variants = useMemo(() => ({
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  }), []);

  return (
    <motion.h1
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{ duration: 0.3 }}
      onAnimationStart={handleAnimation}
      className="text-[#212121] font-[500] pb-10 x-sm:text-4xl"
    >
      Trending Stories
    </motion.h1>
  );
};

export default BlogSection;
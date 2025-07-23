import BlogCard from "./BlogCard";
import company from "public/assets/images/company.png";
import { ReadTime } from "../../services/date";
import { ArticlesProps } from "@/types/interface";

const Articles: React.FC<ArticlesProps> = (props) => {
  const { similarArticles } = props;

  if (!similarArticles || similarArticles.length === 0) {
    return null;
  }

  return (
    <section className="">
      <div className="container mt-10 w-full p-4 lg:mx-auto">
        <h1 className="items-center justify-center text-center text-4xl font-medium text-slate-900 lg:ml-10 lg:text-left lg:text-4xl">
          Similar Articles
        </h1>
        <br />
        {similarArticles.map((item) => (
          <BlogCard
            key={item._id}
            id={item._id}
            link={`/blog/${item._id}`}
            Title={item.title}
            imagesrc={
              item.imageUrl === "your_image_url_here" ? company : item.imageUrl
            }
            // Solution 1: Provide default values
            author={item.author?.name || "Unknown Author"}
            company={item.companyName || "Unknown Company"}
         
            readingTime={ReadTime(item.description)}
            date={item.createdAt}
          />
        ))}
      </div>
    </section>
  );
};

export default Articles;
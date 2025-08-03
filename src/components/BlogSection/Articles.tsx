import BlogCard from "./BlogCard";
import company from "public/assets/images/company.png";
import { ReadTime } from "../../services/date";

interface ArticleAuthor {
  name: string;
}

interface Article {
  _id: string;
  title: string;
  imageUrl: string;
  author?: ArticleAuthor;
  companyName?: string;
  description: string;
  createdAt: string;
}

interface ArticlesProps {
  similarArticles: Article[];
}

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
            author={item.author?.name || "Anonymous"}
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

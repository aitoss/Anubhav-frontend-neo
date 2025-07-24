import Blog from "../../../../components/BlogSection/Blog";
import Footer from "../../../../components/Landing/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";
import { ViewBlogProps } from "@/types/interface";

const ViewBlog = ({ params }: ViewBlogProps) => {
  const { id } = params;
  return (
    <div className="bg-white">
      <Navbar />
      <Blog id={id} />
      <Footer />
    </div>
  );
};

export default ViewBlog;

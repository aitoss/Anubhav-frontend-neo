import Blog from "../../../../components/BlogSection/Blog";
import Footer from "../../../../components/Landing/Footer/Footer";
import Navbar from "../../../../components/Navbar/Navbar";

interface ViewBlogProps {
  params: {
    id: string;
  };
}

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

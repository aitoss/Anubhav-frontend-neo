import Blog from "../../components/BlogSection/Blog";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const ViewBlog = () => {
  return (
    <div className="bg-white">
      <Navbar />
      <Blog />
      <Footer />
    </div>
  );
};

export default ViewBlog;

import Blog from "../../../../components/BlogSection/Blog";

interface ViewBlogProps {
  params: {
    id: string;
  };
}

const ViewBlog = ({ params }: ViewBlogProps) => {
  const { id } = params;
  return (
    <div className="bg-white">
      <Blog id={id} />
    </div>
  );
};

export default ViewBlog;

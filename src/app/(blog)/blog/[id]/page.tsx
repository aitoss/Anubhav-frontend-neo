import Blog from "../../../../components/BlogSection/Blog";

interface ViewBlogProps {
  params: Promise<{
    id: string;
  }>;
}

const ViewBlog = async ({ params }: ViewBlogProps) => {
  const { id } = await params;
  return (
    <div className="bg-white">
      <Blog id={id} />
    </div>
  );
};

export default ViewBlog;

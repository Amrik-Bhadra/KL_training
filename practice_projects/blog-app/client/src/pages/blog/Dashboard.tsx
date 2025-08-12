import { useQuery } from "@tanstack/react-query";
import BlogCard from "../../components/blogs/BlogCard";
import SearchBar from "../../components/blogs/SearchBar";
import { getAllBlogs } from "../../services/blogApi";
import type { Blog } from "../../utils/blogTypes";
import Button from "../../components/blogs/Button";

const Dashboard = () => {
  const { data, isLoading } = useQuery<Blog[]>({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-[90%] h-full mx-auto p-3 flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <SearchBar />
        <Button text="Add Blog" onClick={() => {}} />
      </div>

      <div className="grid grid-cols-3 gap-3 w-full">
        {data?.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            tags={blog.tags}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

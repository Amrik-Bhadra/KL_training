import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formatContent } from "../../utils/helpers";
import BlogTag from "./BlogTag";
import Button from "./Button";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { deleteBlog } from "../../services/blogApi";

interface BlogCardProps {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
}

const BlogCard = ({ id, title, content, author, tags }: BlogCardProps) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      // Force refetch of the blogs query
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });

  return (
    <div className="p-3 bg-[#464646]/40 rounded-md flex flex-col gap-y-2 h-fit basis-[calc(33.333%-1rem)] shrink-0">
      <h2 className="font-semibold text-lg text-blue-300">{title}</h2>
      <p className="text-sm text-[#ccc]/80">{formatContent(content)}</p>

      <span className="mt-1 bg-[#464645] text-gray-300 w-fit rounded-full px-2 py-1 text-sm font-medium">
        @{author}
      </span>

      <div className="flex items-center gap-3 mt-2">
        {tags.map((tag) => (
          <BlogTag tagValue={tag} />
        ))}
      </div>

      <div className="mt-2 flex justify-between items-center gap-4">
        <Button text="Read" onClick={() => {}} customClass="w-2/3" />

        <span id="btn-grp" className="flex items-center gap-2">
          <button
            onClick={() => {}}
            className="h-10 w-10 p-2 rounded-full bg-gray-300/20 text-gray-200 flex items-center justify-center"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => deleteMutation.mutate(id)}
            className="h-10 w-10 p-2 rounded-full bg-gray-300/20 text-gray-200 flex items-center justify-center"
          >
            <FaTrash />
          </button>
        </span>
      </div>
    </div>
  );
};

export default BlogCard;

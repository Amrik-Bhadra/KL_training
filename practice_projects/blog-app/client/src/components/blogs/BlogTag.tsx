interface BlogTagProps{
    tagValue: string;
}

const BlogTag = ({ tagValue }: BlogTagProps) => {
  return (
    <span className="bg-blue-500/20 border border-blue-500 px-2 py-1 rounded-md text-sm font-semibold text-white">
      #{tagValue}
    </span>
  );
};

export default BlogTag;

export const formatContent = (content: string) => {
    return content.split(" ").slice(0, 10).join(" ") +
          (content.split(" ").length > 10 ? "..." : "");
}
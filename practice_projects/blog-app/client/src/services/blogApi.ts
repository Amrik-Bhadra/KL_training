import type { Blog } from "../utils/blogTypes";
import axiosInstance from "./axiosInstance";

export const getAllBlogs = async(): Promise<Blog[]> => {
    const response = await axiosInstance.get('/blogs');
    return response.data;
}

export const deleteBlog = async (id: string) => {
  await axiosInstance.delete(`/blogs/${id}`); 
};

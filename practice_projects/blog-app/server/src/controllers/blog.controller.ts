import { CreateBlogInput, UpdateBlogInput } from "../dto/blog.dto";
import { Request, Response } from "express"
import { BlogService } from "../services/blog.services"

const blogService = new BlogService();

export const createBlog = async (req: Request<{}, {}, CreateBlogInput>, res: Response) => {
    const payload = req.body;
    const created = await blogService.createBlog(payload);
    res.status(201).json(created);
}

export const listBlogs = async (req: Request, res: Response) => {
    const skip = Number(req.query.skip ?? 0);
    const limit = Number(req.query.limit ?? 20);
    const blogs = await blogService.listAllBlogs(skip, limit);
    res.status(200).json(blogs);
}

export const getBlogById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await blogService.getBlogById(id);
    res.status(200).json(blog);
}

export const getBlogByTitle = async (req: Request, res: Response) => {
    const { title } = req.params;
    const blog = await blogService.getBlogByTitle(title);
    res.status(200).json(blog);
}

export const updateBlog = async (req: Request<{ id: string }, {}, UpdateBlogInput>, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const updated = await blogService.updateBlog(id, payload);
    res.json(updated);
}

export const deleteBlog = async (req: Request, res: Response) => {
    const { id } = req.params;
    await blogService.deleteBlog(id);
    res.status(204).send();
}
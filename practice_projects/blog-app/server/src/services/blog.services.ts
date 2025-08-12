import { CreateBlogInput, UpdateBlogInput } from "../dto/blog.dto";
import { BlogModel, IBlogDocument } from "../models/blog.model";
import { BlogRepository } from "../repositories/blog.repository";
import { ApiError } from "../utils/apiErrors";


export class BlogService {
    private repo: BlogRepository;

    constructor(repo?: BlogRepository){
        this.repo = repo ?? new BlogRepository(BlogModel);
    }

    async createBlog(playload: CreateBlogInput): Promise<IBlogDocument> {
        const existing = await this.repo.findByTitle(playload.title);

        if(existing) throw new ApiError(409, 'A blog with this title already exists');

        const created = await this.repo.create(playload);
        return created;
    }


    async listAllBlogs(skip = 0, limit = 20){
        return await this.repo.findAll(skip, limit);
    }

    async getBlogById(id: string) {
        const found = await this.repo.findById(id);
        if(!found) throw new ApiError(404, 'Blog not found');

        return found;
    }

    async getBlogByTitle(title: string){
        const found = await this.repo.findByTitle(title);
        if(!found) throw new ApiError(404, 'Blog not found');
        return found;
    }

    async updateBlog(id: string, payload: UpdateBlogInput){
        const updated = await this.repo.updateById(id, payload);
        if(!updated) throw new ApiError(404, 'Blog not found to update');
        return updated;
    }

    async deleteBlog(id: string){
        const deleted = await this.repo.deleteById(id);
        if(!deleted) throw new ApiError(404, 'Blog not found to delete');

        return deleted;
    }
}

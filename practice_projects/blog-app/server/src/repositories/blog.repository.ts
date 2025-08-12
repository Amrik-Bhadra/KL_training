import { BlogModel, IBlogDocument } from "../models/blog.model";
import { CreateBlogInput, UpdateBlogInput } from "../dto/blog.dto";
import { Model } from "mongoose";

export class BlogRepository {
    private model: Model<IBlogDocument>;

    constructor(model = BlogModel) {
        this.model = model;
    }

    async create(payload: CreateBlogInput): Promise<IBlogDocument> {
        const doc = await this.model.create(payload);
        return doc;
    }

    async findById(id: string): Promise<IBlogDocument | null> {
        return await this.model.findById(id).exec();
    }

    async findByTitle(title: string): Promise<IBlogDocument | null> {
        return this.model.findOne({ title: new RegExp(`^${title}$`, 'i') }).exec();
    }

    async findAll(skip = 0, limit = 20) {
        return this.model.find().sort({ createdAt: -1 }).skip(skip).limit(limit).exec();
    }

    async updateById(id: string, payload: UpdateBlogInput) {
        return this.model.findByIdAndUpdate(id, payload, { new: true }).exec();
    }

    async deleteById(id: string) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
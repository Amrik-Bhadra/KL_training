import { Schema, model } from "mongoose";

export interface IBlog {
    title: string,
    content: string,
    author?: string,
    tags?: string[],
    createdAt?: Date,
    updatedAt?: Date,
}

export interface IBlogDocument extends IBlog, Document {}

const BlogSchema = new Schema<IBlogDocument>({
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    author: { type: String },
    tags: [{ type: String }],
}, {
    timestamps: true
});

export const BlogModel = model<IBlogDocument>('Blog', BlogSchema);
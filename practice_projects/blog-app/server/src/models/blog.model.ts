import { Schema, model } from "mongoose";

export interface IBlog extends Document {
    title: string,
    content: string,
    author?: string,
    tags?: string[],
    createdAt?: Date,
    updatedAt?: Date,
}

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true, index: true },
    content: { type: String, required: true },
    author: { type: String },
    tags: [{ type: String }],
}, {
    timestamps: true
});

export const BlogModel = model<IBlog>('Blog', BlogSchema);
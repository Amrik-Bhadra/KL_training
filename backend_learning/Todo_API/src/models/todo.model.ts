import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description: string;
    isComplete: boolean;
}

const todoSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isComplete: { type: Boolean, default: false }
}, { timestamps: true });

export const TodoModel = mongoose.model<ITodo>('Todo', todoSchema);
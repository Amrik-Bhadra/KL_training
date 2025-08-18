import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { env } from "../config/env";
import { NextFunction, Request, Response } from 'express';
import { ApiError } from "../utils/ApiError";

const storage = multer.memoryStorage();

export const uploadRegistrationFiles = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, //10mb each
    fileFilter: (_req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const field = file.fieldname;

        if (field === 'profilePic') {
            const ok = ['.png', '.jpg', '.jpeg'].includes(ext);
            if (ok) return cb(null, true);
            return cb(new ApiError(400, 'Invalid profile pic type') as Error, false);
        }

        if (field === 'cv') {
            const ok = ext === '.pdf';
            if (ok) return cb(null, true);
            return cb(new ApiError(400, 'CV must be a PDF') as Error, false);
        }

        return cb(new ApiError(400, 'Unexpected file field') as Error, false);
    }

}).fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'cv', maxCount: 1 },
]);
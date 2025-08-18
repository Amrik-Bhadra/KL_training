import { createUserSchema } from "../dtos/user.dto";
import { userService } from "../services/user.services";
import { NextFunction, Request, Response } from "express";
import { uploadToS3 } from "../utils/s3Uploader";

export class UserController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      // ✅ 1. Validate text fields
      const parsed = createUserSchema.parse({
        ...req.body,
        age: Number(req.body.age),
        phoneNumber: String(req.body.phoneNumber),
      });

      // ✅ 2. Validate presence of files
      if (!req.files || !("profilePic" in req.files) || !("cv" in req.files)) {
        return res.status(400).json({ message: "Profile picture and CV are required" });
      }

      const profilePicFile = (req.files as any).profilePic[0];
      const cvFile = (req.files as any).cv[0];

      // ✅ 3. Validate file MIME types
      if (!profilePicFile.mimetype.startsWith("image/")) {
        return res.status(400).json({ message: "Invalid profile picture format" });
      }
      if (cvFile.mimetype !== "application/pdf") {
        return res.status(400).json({ message: "CV must be a PDF" });
      }

      // ✅ 4. Upload to S3
      const profilePicUrl = await uploadToS3(profilePicFile, "profile-pictures");
      const cvUrl = await uploadToS3(cvFile, "cv-files");

      // ✅ 5. Call service layer to save user
      const savedUser = await userService.registerUser({
        ...parsed,
        profilePic: profilePicUrl,
        cv: cvUrl,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: savedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

export const userController = new UserController();

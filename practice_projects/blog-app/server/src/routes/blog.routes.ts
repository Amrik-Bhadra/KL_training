import { Router } from 'express';
import * as controller from "../controllers/blog.controller";
import { asyncHandler } from "../middlewares/asyncHandler";

import { validateBody, validateParams } from "../middlewares/validation.middleware";
import { createBlogSchema, updateBlogSchema, paramsIdSchema, paramsTitleSchema } from '../dto/blog.dto';

const router = Router();

router.post('/', validateBody(createBlogSchema), asyncHandler(controller.createBlog));

router.get('/', asyncHandler(controller.listBlogs));

router.get('/:id', validateParams(paramsIdSchema), asyncHandler(controller.getBlogById));

router.get('/:title', validateParams(paramsTitleSchema), asyncHandler(controller.getBlogByTitle));

router.put('/:id', validateParams(paramsIdSchema), validateBody(updateBlogSchema), asyncHandler(controller.updateBlog));

router.delete('/:id', validateParams(paramsIdSchema), asyncHandler(controller.deleteBlog));

export default router;



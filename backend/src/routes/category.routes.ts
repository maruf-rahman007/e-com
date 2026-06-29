import { Router } from "express";
import { getCategoriesHandler } from "../controllers/category.controller";

const router = Router();

router.get("/", getCategoriesHandler);

export default router;

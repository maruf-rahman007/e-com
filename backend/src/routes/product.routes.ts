import { Router } from "express";
import { getProductsHandler, getProductByIdHandler } from "../controllers/product.controller";
import { validateQuery } from "../middlewares/validateQuery";

const router = Router();

router.get("/", validateQuery, getProductsHandler);
router.get("/:id", getProductByIdHandler);

export default router;

import express from "express";
import slugify from "slugify";
import { newProductValidation } from "../middlewares/joiValidation.js";
import { insertProduct } from "../models/product/ProductModel.js";
const router = express.Router();

router.post("/", newProductValidation, async (req, res, next) => {
  try {
    const { name, ...rest } = req.body;
    if (typeof name === "string" && name.length) {
      const slug = slugify(name, {
        lower: true,
      });
      const product = await insertProduct({
        name,
        ...rest,
        slug,
      });
      if (product?._id) {
        res.json({
          status: "success",
          message: "New Product created successfully",
        });
      }
    }
    res.json({
      status: "error",
      message: "Failed to add categories",
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate")) {
      error.message = "This category already exists, try another one";
      error.statusCode = 200;
    }
    next(error);
  }
});
export default router;

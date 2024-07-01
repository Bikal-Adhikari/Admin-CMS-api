import express from "express";
import slugify from "slugify";
import {
  getAllCategories,
  insertCategory,
} from "../models/category/CategoryModel.js";
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;
    if (typeof title === "string" && title.length) {
      const slug = slugify(title, {
        lower: true,
      });
      const cat = await insertCategory({
        title,
        slug,
      });
      if (cat?._id) {
        res.json({
          status: "success",
          message: "New Category created successfully",
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

router.get("/", async (req, res, next) => {
  try {
    const categories = await getAllCategories();
    res.json({
      status: "success",
      message: "All categories are fetched from database",
      categories,
    });
  } catch (error) {
    next(error);
  }
});

export default router;

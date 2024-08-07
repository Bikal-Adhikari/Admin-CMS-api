import express from "express";
const router = express.Router();
import slugify from "slugify";

import {
  deleteProduct,
  editProduct,
  getAProduct,
  getAllProducts,
  insertProduct,
} from "../models/product/ProductModel.js";
import { newProductValidation } from "../middlewares/joiValidation.js";
import multerUpload from "../utils/uploadMulter.js";

router.post(
  "/",
  multerUpload.array("images", 5),
  newProductValidation,
  async (req, res, next) => {
    try {
      const { name } = req.body;

      // generate thumbnail path
      // generate images paths

      if (req.files?.length > 0) {
        const newImgs = req.files.map((item) => {
          return item.path.replace("public", "");
        });
        req.body.images = newImgs;
        req.body.thumbnail = newImgs[0];
      }

      const slug = slugify(name, {
        lower: true,
      });

      const prod = await insertProduct({
        ...req.body,
        slug,
      });

      if (prod?._id) {
        return res.json({
          status: "success",
          message: "New product has been added",
        });
      }

      res.json({
        status: "error",
        message: "Unable to add product, try again later",
      });
    } catch (error) {
      if (error.message.includes("E11000 duplicate")) {
        error.message =
          "This product slug or sku already exist, please change the name of the Product or sku and try agian.";
        error.statusCode = 400;
      }
      next(error);
    }
  }
);

router.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json({
      status: "success",
      message: "",
      products,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await getAProduct(_id);

    res.json({
      status: "success",
      message: "",
      product,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const product = await editProduct(_id, req.body);
    product?._id
      ? res.json({
          status: "success",
          message: "Product edited successfully",
        })
      : res.json({
          status: "error",
          message: "Failed to edit product",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const product = await deleteProduct(_id);
    product?._id
      ? res.json({
          status: "success",
          message: "Product deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Failed to delete product",
        });
  } catch (error) {
    next(error);
  }
});

export default router;

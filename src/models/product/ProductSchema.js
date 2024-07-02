import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    name: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      unique: [
        true,
        "This sku has already been used for the another product, please use different sku",
      ],
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      index: 1,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    salesPrice: {
      type: Number,
      default: null,
    },
    salesStart: {
      type: Date,
      default: "",
    },
    salesEnd: {
      type: Date,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);

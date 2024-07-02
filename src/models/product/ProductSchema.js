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
      unique: true,
      index: 1,
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
    category: {
      type: String,
      required: true,
    },
    salesPrice: {
      type: Number,
    },
    salesStart: {
      type: Date,
    },
    salesEnd: {
      type: Date,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("product", productSchema);

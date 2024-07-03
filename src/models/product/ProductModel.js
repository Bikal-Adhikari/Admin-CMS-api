import ProductSchema from "./ProductSchema.js";

export const insertProduct = (productObj) => {
  return ProductSchema(productObj).save();
};

export const getAllProducts = () => {
  return ProductSchema.find();
};
export const getAProduct = (_id) => {
  return ProductSchema.findById(_id);
};

export const editProduct = (_id, obj) => {
  return ProductSchema.findByIdAndUpdate(_id, obj);
};

export const deleteProduct = (_id) => {
  return ProductSchema.findByIdAndDelete(_id);
};

import productSchema from "./ProductSchema.js";

export const insertProduct = (productObj) => {
  return productSchema(productObj).save();
};

export const getProduct = (filter) => {
  return productSchema.findOne(filter);
};

export const deleteProduct = (filter) => {
  return productSchema.findOneAndDelete(filter);
};
export const deleteManyProduct = (filter) => {
  return productSchema.deleteMany(filter);
};

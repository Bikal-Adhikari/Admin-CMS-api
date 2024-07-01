import CategorySchema from "./CategorySchema.js";

export const insertCategory = (categoryObj) => {
  return CategorySchema(categoryObj).save();
};

export const getAllCategories = () => {
  return CategorySchema.find();
};

// export const deleteCategory = (filter) => {
//   return CategorySchema.findOneAndDelete(filter);
// };
// export const deleteManyCategory = (filter) => {
//   return CategorySchema.deleteMany(filter);
// };

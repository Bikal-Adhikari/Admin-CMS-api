import CategorySchema from "./CategorySchema.js";

export const insertCategory = (categoryObj) => {
  return CategorySchema(categoryObj).save();
};

export const getAllCategories = () => {
  return CategorySchema.find();
};

export const EditCategory = (_id, obj) => {
  return CategorySchema.findByIdAndUpdate(_id, obj, { new: true });
};
export const deleteCategory = (_id) => {
  return CategorySchema.findByIdAndDelete(_id);
};
// export const deleteManyCategory = (filter) => {
//   return CategorySchema.deleteMany(filter);
// };

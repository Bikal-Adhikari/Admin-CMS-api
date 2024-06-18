import UserSchema from "./userSchema.js";

export const createNewUser = (userObj) => {
  return UserSchema(userObj).save();
};

// export const getUserByEmail = (email) => {
//   return UserSchema.findOne({ email });
// };
export const getAUser = (filter) => {
  return UserSchema.findOne(filter);
};
export const getAllUser = () => {
  return UserSchema.find();
};

export const updateUser = async (filter, obj) => {
  return await UserSchema.findOneAndUpdate(filter, obj);
};
export const updateUserById = async ({ _id, obj }) => {
  return await UserSchema.findByIdAndUpdate(_id, obj);
};

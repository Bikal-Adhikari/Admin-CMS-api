import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_URL);

    conn && console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

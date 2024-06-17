import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGOOSE_URL);

    con && console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

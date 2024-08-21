import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected!!");
  } catch (e) {
    console.log("Error: ", e);
    process.exit(1);
  }
};

export default connectDB;

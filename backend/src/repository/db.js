import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const dbUrl =
      process.env.MONGO_URL || "mongodb://127.0.0.1:27017/RealTimeChatDB";

    await mongoose.connect(dbUrl);

    console.log("DB Connection");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

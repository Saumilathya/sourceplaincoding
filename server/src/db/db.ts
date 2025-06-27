require("dotenv").config();
import mongoose from "mongoose";
const db_url = process.env.MONGDB_URL || "";


export const connectDb = async () => {
  try {
    await mongoose.connect(db_url).then((data: any) => {
      console.log(`Database connected with ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDb, 5000);
  }
};

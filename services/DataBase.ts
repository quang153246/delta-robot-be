import mongoose from "mongoose";
import { DATABASE_URL } from "../config";

export default async () => { 
    mongoose.connect( DATABASE_URL,
        async (err) => {
            if (err) throw err;
            console.log("Database Connected");
        }
    );
}
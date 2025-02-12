// Creating Database connection
"use server"
import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    await mongoose.connect(process.env.NEXT_PUBLIC_DB!).then(()=>{
        console.log("Database connected");
    }).catch((error)=>{
        console.log("Database cannot connect due to :- ", error);
    })
}

"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import ConnectDB from "../../../../actions/db";

const jobSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    location: String,
    salaryRange: {
        from: Number || null,
        to: Number || null
    }
}, { collection: "jobs" });

const jobsModel = mongoose.models.jobs || mongoose.model("jobs", jobSchema);

//Route to view all jobs
export const GET = async (req: NextRequest) => {
    ConnectDB();

    try {
        const response = await jobsModel.find();

        if (response.length > 0) {
            return NextResponse.json({ status: 200, message: response });
        } else {
            return NextResponse.json({ status: 404, message: "no jobs found" });
        }


    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
//Route to post new jobs
export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    const allData = {
        title: data.title,
        description: data.description,
        category: data.category,
        location: data.location,
        salaryRange: data.salaryRange
    }
    // logic in case of adding new job post
    if(!data._id){
        try {
            const response = await jobsModel.insertMany([allData]);
            if (response.length > 0) {
                return NextResponse.json({ status: 200, message: response });
            } else {
                return NextResponse.json({ status: 404, message: "cannot add job data" });
            }
    
        } catch (errors) {
            console.log(errors);
            return NextResponse.json({ status: 400, message: errors });
        }
    }else{ // logic in case looking for a specific job post
        try {
            const response = await jobsModel.find({ _id: data?._id});
            if (response) {
                return NextResponse.json({ status: 200, message: response });
            } else {
                return NextResponse.json({ status: 404, message: "no jobs found" });
            }
    
        } catch (errors) {
            console.log(errors);
            return NextResponse.json({ status: 400, message: errors });
        }
    }

}
//Route to edit new jobs
export const PUT = async (req: NextRequest) => {
    ConnectDB();
    const {_id,...allData} = await req.json();
    
    console.log("Test 1 :-",_id,allData);
    
    try {
        const response = await jobsModel.findOneAndUpdate(
            {_id:_id},
            {$set:allData},
            {new:true});
         
            console.log(response)
        if (response) {
            return NextResponse.json({ status: 200, message: response });
        } else {
            return NextResponse.json({ status: 404, message: "cannot edit job data" });
        }


    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
//Route to delete jobs
export const DELETE = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    try {
        const response = await jobsModel.findOneAndDelete(data?._id);

        if (response) {
            return NextResponse.json({ status: 200, message: response });
        } else {
            return NextResponse.json({ status: 404, message: "cannot delete job" });
        }


    } catch (errors) {
        console.log(errors);
        return NextResponse.json({ status: 400, message: errors });
    }

}
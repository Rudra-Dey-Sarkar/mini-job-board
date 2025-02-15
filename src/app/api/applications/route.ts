"use server"
import { NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import ConnectDB from "../../../../actions/db";

const applicationSchema = new mongoose.Schema({
    jobId: String,
    name: String,
    email: String,
    experience: Number || null,
    resume: String,
    coverLetter: String,
}, { collection: "applications" });

const applicationModel = mongoose.models.applications || mongoose.model("applications", applicationSchema);

//Route to apply jobs and see the application
export const POST = async (req: NextRequest) => {
    ConnectDB();
    const data = await req.json();
    const allData = {
        jobId: data?.jobId,
        name: data?.name,
        email: data?.email,
        experience: data?.experience,
        resume: data?.resume,
        coverLetter: data?.coverLetter,
    }
    // logic to look for a specific jobs all applications
    if (data?.jobId !== undefined && data?.name === undefined && data?.email === undefined && data?.experience === undefined && data?.resume === undefined && data?.coverLetter === undefined) {
        try {
            const response = await applicationModel.find({ jobId: data?.jobId });
            if (response.length > 0) {
                return NextResponse.json({ status: 200, message: response });
            } else {
                return NextResponse.json({ status: 404, message: "no jobs applications found" });
            }

        } catch (errors) {
            console.log(errors);
            return NextResponse.json({ status: 400, message: errors });
        }
    } else { // logic to add a new applications
        if (!data._id) {
            try {
                const response = await applicationModel.insertMany([allData]);
                if (response.length > 0) {
                    return NextResponse.json({ status: 200, message: response });
                } else {
                    return NextResponse.json({ status: 404, message: "cannot add job application data" });
                }

            } catch (errors) {
                console.log(errors);
                return NextResponse.json({ status: 400, message: errors });
            }
        } else { //logic to view specific application
            try {
                const response = await applicationModel.find({ _id: data?._id });
                if (response.length > 0) {
                    return NextResponse.json({ status: 200, message: response });
                } else {
                    return NextResponse.json({ status: 404, message: "no jobs applications found" });
                }

            } catch (errors) {
                console.log(errors);
                return NextResponse.json({ status: 400, message: errors });
            }
        }
    }

}

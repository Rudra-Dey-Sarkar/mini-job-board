"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type CandidateDataType = [{
    jobId: string;
    name: string;
    email: string;
    experience: number | null;
    resume: string;
    coverLetter: string;
}];

type PageProps = {
    params: Promise<{ jobId: string }>;
};

async function Apply(data: CandidateDataType[0], setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setIsApplied: React.Dispatch<React.SetStateAction<boolean>>) {
    setIsLoading(true);
    try {
        const response = await fetch("/api/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const resData = await response;
        if (resData.status === 200) {
            setIsLoading(false);
            setIsApplied(true);
            toast.success("Applied");
        } else {
            setIsLoading(false);
            toast.error("An Error Occurred");
        }
    } catch (errors) {
        setIsLoading(false);
        console.log("Cannot Proceed To Apply The Job Due To :-", errors);
        toast.error("Cannot Apply The Job");
    }

}

function ApplyJob({ params }: PageProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isApplied, setIsApplied] = useState<boolean>(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CandidateDataType[0]>({
        defaultValues: {
            jobId: "",
            name: "",
            email: "",
            experience: null,
            resume: "",
            coverLetter: "",
        }
    });

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            setValue("jobId", resolvedParams.jobId);
        }
        fetchParams();
    }, [params, setValue]);

    return (
        <div className="grid justify-center items-center w-full h-full">
            {/* Success message */}
            {isApplied === true &&
                <div
                    className='flex fixed inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
                    onClick={() => setIsApplied(false)}>
                    <div
                        className='grid gap-y-14 bg-green-500  p-10'
                        onClick={(e) => e.stopPropagation()}>
                        <div className='flex justify-end'>
                            <button
                                className='font-bold text-red-500 text-[1.2rem]'
                                onClick={() =>{
                                    setIsApplied(false);
                                    router.push("/candidate/jobs");
                                }}>Close</button>
                        </div>
                        <p className="font-semibold text-[2rem] text-white">Applied Successfully🎉</p>
                    </div>
                </div>
            }
            <div className="grid gap-y-7">
                <p className="text-center font-semibold text-[1.2rem] sm:text-[1.6rem]">Apply for this Job</p>
                <form
                    className="grid border-2 gap-y-2 border-gray-600 p-5 w-fit h-fit"
                    onSubmit={handleSubmit((data) => Apply(data, setIsLoading, setIsApplied))}>
                    {/* Loader */}
                    {isLoading && (
                        <div className="fixed flex inset-0 justify-center items-center bg-gray-100 bg-opacity-50 z-50">
                            <img
                                src="https://hstilxjonxwbqwojwimd.supabase.co/storage/v1/object/sign/profile_picture/features/loader.gif"
                                alt="Loading..."
                                className="w-[100px] h-[100px]"
                            />
                        </div>
                    )}

                    {/* Name */}
                    <label htmlFor="name" className="font-semibold">
                        Full Name :-
                    </label>
                    <input
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        className="border-2 border-gray-600 p-1"
                        placeholder="Devid"
                    />
                    {errors.name && <p className="text-[12px] text-red-500">{errors.name.message}</p>}

                    {/* Email */}
                    <label htmlFor="email" className="font-semibold">
                        Email Address :-
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="border-2 border-gray-600 p-1"
                        placeholder="devid@example.com"
                    />
                    {errors.email && <p className="text-[12px] text-red-500">{errors.email.message}</p>}

                    {/* Experience */}
                    <label htmlFor="experience" className="font-semibold">
                        Years of Experience :-
                    </label>
                    <input
                        type="number"
                        {...register("experience", { required: "Experience is required", min: 0 })}
                        className="border-2 border-gray-600 p-1"
                        placeholder="2"
                    />
                    {errors.experience && <p className="text-[12px] text-red-500">{errors.experience.message}</p>}

                    {/* Resume Upload */}
                    <label htmlFor="resume" className="font-semibold">
                        Enter Resume Link :-
                    </label>
                    <input
                        type="text"
                        {...register("resume", { required: "Resume is required" })}
                        className="border-2 border-gray-600 p-1"
                    />
                    {errors.resume && <p className="text-[12px] text-red-500">{errors.resume.message}</p>}

                    {/* Cover Letter */}
                    <label htmlFor="coverLetter" className="font-semibold">
                        Cover Letter :-
                    </label>
                    <textarea
                        {...register("coverLetter", { required: "Cover Letter is required" })}
                        className="border-2 border-gray-600 p-1"
                        placeholder="Why are you a good fit for this job?"
                    />
                    {errors.coverLetter && <p className="text-[12px] text-red-500">{errors.coverLetter.message}</p>}

                    {/* Submit Button */}
                    <button type="submit" className="bg-gray-300 p-2 mt-2 font-semibold">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ApplyJob;

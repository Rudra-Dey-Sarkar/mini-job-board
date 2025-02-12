"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'


type JobDataType = {
    _id: string,
    title: string,
    description: string,
    category: string,
    location: string,
    salaryRange: {
        from: number | null,
        to: number | null
    }
}

async function EditJobData(data: JobDataType, setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, setEJ: React.Dispatch<React.SetStateAction<JobDataType | undefined>>) {
    setIsLoading(true);
    try {
        const response = await fetch("/api/jobs", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        const resData = await response;
        if (resData.status===200) {
            setEJ(undefined);
            setIsLoading(false);
            toast.success("Job Edited Successfully");
        } else {
            setIsLoading(false);
            toast.error("An Error Occurred");
        }
    } catch (errors) {
        setIsLoading(false);
        console.log("Cannot Proceed To Edit Job Data Due To :-", errors);
        toast.error("Cannot Edit Job");
    }

}

function EditJob({ EJ,setEJ }: { EJ: JobDataType | undefined , setEJ: React.Dispatch<React.SetStateAction<JobDataType | undefined>> }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<JobDataType>({
        defaultValues: {
            _id:EJ?._id,
            title: EJ?.title,
            description: EJ?.description,
            category: EJ?.category,
            location: EJ?.location,
            salaryRange: {
                from: EJ?.salaryRange?.from,
                to: EJ?.salaryRange?.to
            }
        }
    });

    const { register, handleSubmit, formState: { errors } } = form;
    return (
        <div className='grid justify-center items-center gap-7 w-full h-full'>
            <p className='text-center font-semibold text-[1.2rem] sm:text-[1.6rem]'>Please complete this form to edit job</p>
            {/* <p>{EJ}</p> */}
            <form
                className='grid border-2 gap-y-2 border-gray-600 p-5 w-fit h-fit'
                onSubmit={handleSubmit((data) => EditJobData(data, setIsLoading, setEJ))}>

                {/* Loader */}
                {isLoading === true &&
                    <div className='fixed flex inset-0 justify-center items-center bg-gray-100 bg-opacity-50 z-50'>
                        <img
                            src="https://hstilxjonxwbqwojwimd.supabase.co/storage/v1/object/sign/profile_picture/features/loader.gif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwcm9maWxlX3BpY3R1cmUvZmVhdHVyZXMvbG9hZGVyLmdpZiIsImlhdCI6MTczODY2NzgyNSwiZXhwIjo0NzM0NTg3ODI1fQ.EzqgoARETFtL8vemGmLZrzTzdKfHyd0u5inm4CWtmcE" alt="Loading....."
                            className='w-[100px] h-[100px]' />
                    </div>
                }

                {/* Title */}
                <label htmlFor="title" className='font-semibold'>Enter Job Title :-</label>
                <input type="text"
                    {...register("title", { required: true })}
                    className='border-2 border-gray-600 p-1'
                    placeholder='Software Developer' />
                {errors?.title && <p className='text-[12px] text-red-500'>Job Title Is Required</p>}
                {/* Description */}
                <label htmlFor="description" className='font-semibold'>Enter Job Description :-</label>
                <textarea
                    {...register("description", { required: true })}
                    className='border-2 border-gray-600 p-1'
                    placeholder='Job Description' />
                {errors?.description && <p className='text-[12px] text-red-500'>Job Description Is Required</p>}
                {/* Category */}
                <label htmlFor="category" className='font-semibold'>Select Job Category :-</label>
                <select
                    className='border-2 border-gray-600 p-1'
                    {...register("category", { required: true })}>
                    <option value="">Job Category</option>
                    <option value="Software Development">Software Development</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Data Science & Analytics">Data Science & Analytics</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="IT Support & Networking">IT Support & Networking</option>
                    <option value="Cloud Computing">Cloud Computing</option>
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="DevOps & Site Reliability Engineering">DevOps & Site Reliability Engineering</option>
                </select>
                {errors?.category && <p className='text-[12px] text-red-500'>Job Category Is Required</p>}
                {/* Location */}
                <label htmlFor="location" className='font-semibold'>Enter Job Location :-</label>
                <input type="text"
                    {...register("location", { required: true })}
                    placeholder='Los Angeles'
                    className='border-2 border-gray-600 p-1' />
                {errors?.location && <p className='text-[12px] text-red-500'>Job Location Is Required</p>}
                {/* Salary Range */}
                <label htmlFor="salary range" className='font-semibold'>Enter Job Salary :-</label>
                <div className='grid sm:flex gap-2'>
                    {/* From */}
                    <div className='grid'>
                        <label htmlFor="from" className='font-semibold'>From :-</label>
                        <input type="number"
                            {...register("salaryRange.from", { required: true })}
                            placeholder='25000'
                            className='border-2 border-gray-600 p-1' />
                    </div>
                    {errors?.location && <p className='text-[12px] text-red-500'>Job Location Is Required</p>}
                    {/* To */}
                    <div className='grid'>
                        <label htmlFor="from" className='font-semibold'>To :-</label>
                        <input type="number"
                            {...register("salaryRange.to", { required: true })}
                            placeholder='70000'
                            className='border-2 border-gray-600 p-1' />
                    </div>
                </div>

                <button
                    type='submit'
                    className='bg-gray-300 p-2 mt-2 font-semibold'>Save Job</button>
            </form>
        </div>
    )
}

export default EditJob
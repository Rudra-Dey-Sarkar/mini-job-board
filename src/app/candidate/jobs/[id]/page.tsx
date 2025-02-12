"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

type JobDataType = [{
    _id: string,
    title: string,
    description: string,
    category: string,
    location: string,
    salaryRange: {
        from: number | null,
        to: number | null
    }
}]
type PageProps = {
    params: Promise<{ id: string }>;
};
async function ViewSpecificJob(_id: string, setJob: React.Dispatch<React.SetStateAction<any[] | JobDataType>>) {
    try {
        const response = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: _id })
        });

        const resData = await response.json();
        if (resData.status === 200) {
            setJob(resData.message);
        } else {
            console.log("An Error Occurred");
        }
    } catch (errors) {
        console.log("Cannot proceed to view jobs due to :-", errors);
    }

}

function ViewJobDetails({ params }: PageProps) {
    const router = useRouter();
    const [job, setJob] = useState<JobDataType | any[]>([]);

    useEffect(() => {
        async function fetchParams() {
            const resolvedParams = await params;
            ViewSpecificJob(resolvedParams.id, setJob);
        }
        fetchParams();

    }, [params]);

    return (
        <div className='border-t-2 border-cyan-500 p-2'>
            {job.length > 0 ?
                <div>
                    <p><strong>Job Title</strong> :- {job?.[0]?.title}</p>
                    <p><strong>Description</strong> :-{job?.[0]?.description}</p>
                    <p><strong>Category</strong> :-{job?.[0]?.category}</p>
                    <p><strong>Location</strong> :-{job?.[0]?.location}</p>
                    <p><strong>Salary Range</strong> :-{job?.[0]?.salaryRange?.from} - {job?.[0]?.salaryRange?.to}</p>

                    <button 
                    className='border-2 border-white mt-5 px-5 py-2 font-semibold rounded-[5px] bg-cyan-500 text-white hover:scale-105 hover:bg-cyan-400'
                    onClick={() => router.push(`/company/jobs/${job?.[0]?._id}/applications`)}>View Applications</button>
                </div> :
                <div className='font-semibold text-[1.6rem] py-5'>
                    <p className='text-center'>No Job Datas Available !</p>
                </div>
            }
        </div>
    )
}

export default ViewJobDetails
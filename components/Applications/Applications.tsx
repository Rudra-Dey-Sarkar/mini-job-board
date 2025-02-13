"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ApplicationModal from '../ApplicationModal/ApplicationModal';

type CandidateDataType = [{
  jobId: string;
  name: string;
  email: string;
  experience: number | null;
  resume: string;
  coverLetter: string;
}];

//Function to view specifit jobs all applications
async function ViewSpecificJobsAllApplications(id: string, setJobApplications: React.Dispatch<React.SetStateAction<any[] | CandidateDataType>>) {
  try {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ jobId: id })
    });

    const resData = await response.json();
    if (resData.status === 200) {
      setJobApplications(resData.message);
    } else {
      console.log("An Error Occurred");
    }
  } catch (errors) {
    console.log("Cannot proceed to view jobs applications due to :-", errors);
  }

}

function Applications() {
  const pathname = usePathname();
  const [jobApplications, setJobApplications] = useState<CandidateDataType | any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<CandidateDataType[0] | undefined>(undefined);

  
  useEffect(() => {
    const data = pathname.split("/");
    ViewSpecificJobsAllApplications(data[3], setJobApplications)
  }, [])
  return (
    <div>
      {isModalOpen !== undefined &&
        <div
          className='fixed flex inset-0 justify-center items-end bg-black bg-opacity-50 z-50'
          onClick={() => setIsModalOpen(undefined)}>
          <div
            className='w-full bg-white p-5'
            onClick={(e) => e.stopPropagation()}>
            <ApplicationModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          </div>
        </div>
      }
      {/* Top portion */}
      <div className='flex justify-between items-center px-2 py-3 bg-cyan-500'>
        <p className='font-semibold text-[1.6rem] text-white underline'>All Job Applications :-</p>
      </div>
      {jobApplications.length > 0 ?
        <div>
          {jobApplications?.map((application: CandidateDataType[0], index: number) =>
            <div
              key={index}
              className='flex justify-between items-center px-2 border-b-2 border-cyan-500 py-4 hover:bg-gray-200 hover:cursor-pointer'
              onClick={() => setIsModalOpen(application)}>
              <p className='font-semibold'>{application.name}</p>
            </div>
          )}
        </div> :
        <div className='font-semibold text-[1.6rem] py-5'>
          <p className='text-center'>No Jobs Available !</p>
        </div>}
    </div>
  )
}

export default Applications
import React from 'react'

type CandidateDataType = [{
    jobId: string;
    name: string;
    email: string;
    experience: number | null;
    resume: string;
    coverLetter: string;
  }];

function ApplicationModal({isModalOpen, setIsModalOpen}:{ isModalOpen: CandidateDataType[0] | undefined, setIsModalOpen: React.Dispatch<React.SetStateAction<CandidateDataType[0] | undefined>>}) {
  return (
    <div>
        <div className='flex justify-end'>
         <button 
         className='font-bold text-red-500 text-[1.2rem]'
         onClick={()=>setIsModalOpen(undefined)}>Close</button>
        </div>
        {isModalOpen!==undefined && 
        <div>
            <p><strong>Name :-</strong>{isModalOpen?.name}</p>
            <p><strong>Email :-</strong>{isModalOpen?.email}</p>
            <p><strong>Experience :-</strong>{isModalOpen?.experience}</p>
            <p><strong>Resume Link :-</strong>{isModalOpen?.resume}</p>
            <p><strong>Cover Letter :-</strong>{isModalOpen?.coverLetter}</p>
        </div>
        }
    </div>
  )
}

export default ApplicationModal
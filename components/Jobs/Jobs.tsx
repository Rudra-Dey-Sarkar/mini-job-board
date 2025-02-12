"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EditJob from '../EditJob/EditJob'
import toast from 'react-hot-toast'
import { usePathname } from 'next/navigation'


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

async function ViewJobs(setJobs: React.Dispatch<React.SetStateAction<any[] | JobDataType>>) {
  try {
    const response = await fetch("/api/jobs");

    const resData = await response.json();
    if (resData.status === 200) {
      setJobs(resData.message);
    } else {
      console.log(resData.message);
    }
  } catch (error) {
    console.log("Cannot proceed to view jobs due to :-", error);
  }
}
async function RemoveEvent(_id: string, setJobs: React.Dispatch<React.SetStateAction<any[] | JobDataType>>) {

  try {
    const response = await fetch("/api/jobs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ _id: _id })
    });

    const resData = await response.json();

    if (resData.status === 200) {
      toast.success("Job Removed");
      setJobs((prevJobs: any[] ) => prevJobs.filter((job: { _id: string }) => job._id !== _id));
    } else {
      toast.error("An Error Occurred");
    }
  } catch (errors) {
    console.log("Cannot Proceed To Delete Job Due To :-", errors);
    toast.error("Cannot Remove Job");
  }

}

function Jobs() {
  const router = useRouter();
  const pathname = usePathname();

  const [jobs, setJobs] = useState<JobDataType | any[]>([]);
  const [EJ, setEJ] = useState<JobDataType[0] | undefined>(undefined);
  const [isRemoveConfirmed, setIsRemoveConfirmed] = useState<string>("");

  useEffect(() => {
    ViewJobs(setJobs);
  }, [EJ, isRemoveConfirmed]);

  return (
    <div>

      {/* Edit Jobs */}
      {EJ !== undefined &&
        <div
          className='flex fixed inset-0 justify-center items-center bg-black bg-opacity-50 z-50'
          onClick={() => setEJ(undefined)}>
          <div
            className='bg-white p-10'
            onClick={(e) => e.stopPropagation()}>
            <EditJob EJ={EJ} setEJ={setEJ} />
          </div>
        </div>
      }

      {/* Top portion */}
      <div className='flex justify-between items-center px-2 py-3 bg-cyan-500'>
        <p className='font-semibold text-[1.6rem] text-white underline'>All Posted Jobs :-</p>

        {pathname !== "/candidate/jobs" &&
          <button
            className='border-2 border-white px-5 py-2 font-semibold rounded-[5px] text-white hover:scale-105 hover:bg-cyan-400'
            onClick={() => router.push("/company/new")}>Post a Job</button>
        }
      </div>

      {/* Jobs */}
      {jobs.length > 0 ?
        <div>
          {jobs?.map((job: JobDataType[0], index: number) =>
            <div
              className='flex justify-between items-center px-2 border-b-2 border-cyan-500 py-4 hover:bg-gray-200 hover:cursor-pointer'
              key={index}
              onClick={() => router.push(pathname === "/company/jobs" ? `/company/jobs/${job?._id}` : `/candidate/jobs/${job?._id}`)}>
              <div>
                <p className='text-[1.2rem] font-semibold'>{job?.title}</p>
                <p className='text-[0.9rem] font-semibold text-cyan-500'>{job?.location}</p>
              </div>

              {pathname !== "/candidate/jobs" ?
                <div className='flex gap-2'>
                  {/* Edit Event Button */}
                  <button
                    className=' bg-cyan-100 p-2 rounded-full hover:scale-105'
                    onClick={(e) => {
                      e.stopPropagation();
                      setEJ(job);
                    }}>
                    <svg
                      width="25px"
                      height="25px"
                      viewBox="0 -0.5 21 21"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink">
                      <title>{"edit_cover [#1481]"}</title>
                      <desc>{"Created with Sketch."}</desc>
                      <defs />
                      <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                        <g
                          id="Dribbble-Light-Preview"
                          transform="translate(-419.000000, -359.000000)"
                          fill="#000000"
                        >
                          <g id="icons" transform="translate(56.000000, 160.000000)">
                            <path
                              d="M384,209.210475 L384,219 L363,219 L363,199.42095 L373.5,199.42095 L373.5,201.378855 L365.1,201.378855 L365.1,217.042095 L381.9,217.042095 L381.9,209.210475 L384,209.210475 Z M370.35,209.51395 L378.7731,201.64513 L380.4048,203.643172 L371.88195,212.147332 L370.35,212.147332 L370.35,209.51395 Z M368.25,214.105237 L372.7818,214.105237 L383.18415,203.64513 L378.8298,199 L368.25,208.687714 L368.25,214.105237 Z"
                              id="edit_cover-[#1481]"
                            />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                  {/* Remove Event Button */}
                  <button
                    className=' bg-cyan-100 p-2 rounded-full hover:scale-105'
                    onClick={(e) => {
                      setIsRemoveConfirmed(job?._id);
                      RemoveEvent(job?._id, setJobs)
                      e.stopPropagation();
                    }}>
                    <svg
                      fill="#ff0000"
                      id="Capa_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="25px"
                      height="25px"
                      viewBox="0 0 490.646 490.646"
                      xmlSpace="preserve"
                      stroke="#ff0000">
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        <g>
                          <g>
                            <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z" />
                            <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z" />
                          </g>
                        </g>
                      </g>
                    </svg>
                  </button>
                </div> :
                <button
                  className='border-2 border-white mt-5 px-5 py-2 font-semibold rounded-[5px] bg-cyan-500 text-white hover:scale-105 hover:bg-cyan-400'
                  onClick={(e) => {
                    e.stopPropagation()
                    router.push(`/candidate/apply/${job?._id}`)
                  }}>Apply</button>
              }
            </div>
          )}
        </div> :
        <div className='font-semibold text-[1.6rem] py-5'>
          <p className='text-center'>No Jobs Available !</p>
        </div>
      }

    </div>
  )
}

export default Jobs
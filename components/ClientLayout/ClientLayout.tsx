"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import Topbar from '../Topbar/Topbar';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Footer from '../Footer/Footer';


function ClientLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    
    useEffect(() => {
        if (pathname === "/company") {
            router.push("/company/jobs");
        }
        if (pathname === "/candidate") {
            router.push("/candidate/jobs");
        }
    }, [pathname]);

    return (
        <div className="w-full h-full" >
            <Toaster />

            {pathname !== "/" &&
                <div>
                    <Topbar />
                    <div className='flex justify-between p-2'>
                        <button
                            className='flex text-[1.2rem] font-bold items-center'
                            onClick={() => router.back()}>
                            <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                className='rotate-0'>
                                <path
                                    fill="#000000"
                                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                />
                                <path
                                    fill="#000000"
                                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                />
                            </svg>
                            <p>Back</p>
                        </button>

                        <button
                            className='flex items-center text-[1.2rem] font-bold'
                            onClick={() => router.forward()}>
                            <p>Forwar</p>
                            <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 1024 1024"
                                xmlns="http://www.w3.org/2000/svg"
                                className='rotate-180'>
                                <path
                                    fill="#000000"
                                    d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                                />
                                <path
                                    fill="#000000"
                                    d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            }
            <div className='w-full h-[100vh]'>
                {children}
            </div>
            {pathname !== "/" &&
                <Footer />
            }

        </div>
    )
}

export default ClientLayout
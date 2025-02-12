"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

function Applications() {
    const pathname = usePathname();
    useEffect(()=>{
        
        const data = pathname.split("/");
        console.log(data[3]);
    },[])
  return (
    <div>Applications</div>
  )
}

export default Applications
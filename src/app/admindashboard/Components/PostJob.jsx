import React from 'react'
import post1 from '../../../../public/assets/post1.jpeg'
import Image from "next/image";
import { CiCalendarDate } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
const PostJob = () => {
  const data = [
    {
      image:post1 ,
      Profile:"UI & UX Designer",
      Para:"Digital Assets",
      Date:"3 years ago",
      Location:"Brooklyn",
      Bill:"$1,200 - $1,500",
      JobType:"Full Time"
    },
    {
      image:post1 ,
      Profile:"UI & UX Designer",
      Para:"Digital Assets",
      Date:"3 years ago",
      Location:"Brooklyn",
      Bill:"$1,200 - $1,500",
      JobType:"Full Time"
    },
    {
      image:post1 ,
      Profile:"UI & UX Designer",
      Para:"Digital Assets",
      Date:"3 years ago",
      Location:"Brooklyn",
      Bill:"$1,200 - $1,500",
      JobType:"Full Time"
    },
    {
      image:post1 ,
      Profile:"UI & UX Designer",
      Para:"Digital Assets",
      Date:"3 years ago",
      Location:"Brooklyn",
      Bill:"$1,200 - $1,500",
      JobType:"Full Time"
    },
    {
      image:post1 ,
      Profile:"UI & UX Designer",
      Para:"Digital Assets",
      Date:"3 years ago",
      Location:"Brooklyn",
      Bill:"$1,200 - $1,500",
      JobType:"Full Time"
    },
    {
      image:post1 ,
      Profile:"UI & UX Designer",
      Para:"Digital Assets",
      Date:"3 years ago",
      Location:"Brooklyn",
      Bill:"$1,200 - $1,500",
      JobType:"Full Time"
    },

   
  ]
  return (
    <>
      <section class="md:py-8 py-0">
    <div class="flex md:justify-between justify-center md:flex-row flex-col items-center md:px-8 px-4 py-16 gap-4">
      <div class="flex flex-col md:w-1/2 w-full text-center ">
        <span class="text-[#ffb600] text-[16px] leading-loose">Jobs</span>
        <span class="text-[#022279] font-bold text-[40px]">Recently Posted Jobs</span>
      </div>
      <div class="md:w-1/2 w-full text-center">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          usmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    <div class="grid px-8  grid-cols-1 md:grid-cols-2 gap-8 pb-20">
      {data.map((item,index)=>(
      <div key={index} class="border border-l-4 border-l-blue-800 rounded-xl   py-8">
        <div class="flex flex-row  md:justify-center justify-between md:px-0 px-8 gap-3">
          {/* <img class="size-20 rounded-lg" src="./style/assets/post1.jpeg" alt="" /> */}
          <div className='flex md:flex-row flex-col md:gap-2 gap-6'>
          <Image src={post1} className="size-20 rounded-lg" alt="Picture of the author" />
          <div class="flex flex-col gap-3">
            <span class="text-xl font-bold text-[#022279]"><a href="">{item.Profile}</a></span>
            <span class="text-lg text-[#a3a0ac]">{item.Para}</span>
            <div class="flex flex-col md:flex-row md:justify-center justify-start  md:items-center items-start gap-2">
              <div class="flex items-center justify-center gap-2">
               
                <CiCalendarDate className='size-5'/>
                <span class="text-[#a3a0ac]">{item.Date}</span>
              </div>
              <div class="flex items-center justify-center gap-2">
              <FaLocationDot className='text-slate-500'/>
                <span class="text-[#a3a0ac]">{item.Location}</span>
              </div>
              <div class="flex items-center justify-center gap-2">
              <FaMoneyCheckDollar className='text-slate-500'/>
                <span class="text-red-400">{item.Bill}</span>
              </div>
            </div>
          </div>
          </div>
          <div class="p-2 h-fit rounded-md bg-[#edfafe] text-center">
            {/* <i class="fa-solid fa-circle" style="color: #63e6be"></i> */}
            
            <span class="text-[#72ccf4]">{item.JobType}</span>
          </div>
        </div>
      </div>

      ))}
     
    </div>
  </section>
    </>
  )
}

export default PostJob
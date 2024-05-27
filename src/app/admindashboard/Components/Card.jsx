import React from 'react'
import { IoIosAdd,  IoIosArrowRoundUp } from "react-icons/io";
import { IoCardOutline } from "react-icons/io5";
const Card = ({title,value}) => {
  return (
    <>
     <div className="bg-white rounded-2xl shadow p-5 space-y-4">
                <div className="flex justify-between gap-14">
                    <div>
                        <div className="text-gray-600 text-sm font-semibold">{title}</div>
                        <div className="text-xl font-semibold">{value}</div>
                    </div>
                    <div className="size-12 bg-[#ec3e20] rounded-full relative">
                        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ">
                        <IoCardOutline className="text-white size-6" />
                        </div>
                    </div>
                </div>
                <div className="flex text-[12px] items-center gap-3">
                    <div className="flex items-center bg-green-200 p-1 rounded-lg">
                    <IoIosArrowRoundUp />
                     <div>
                     13%
                        </div>         
                  </div>
                    <div>Since Last Month</div>
                </div>
            </div>
    </>
  )
}

export default Card;
"use client"
import Image from 'next/image'
import React, { useEffect } from "react";
import med from '../../../../public/assets/med.jpeg'
import { FaStar } from "react-icons/fa";
import { IoIosCheckmark } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import dynamic from "next/dynamic";


const OwlCarousel = dynamic(() => import("react-owl-carousel"), { ssr: false });

const data = [
  {
    image:med,
    name:"Mila kunis",
    Addresss:"California, United States",
    Description:"Through our expertise, technological knowledge, global presence and bespoke.",
  },
  {
    image:med,
    name:"Jeniffer Aniston",
    Addresss:"Dallas, United States",
    Description:"Through our expertise, technological knowledge, global presence and bespoke.",
  },
  {
    image:med,
    name:"Jeniffer Lawrence",
    Addresss:"New Jersey, United States",
    Description:"Through our expertise, technological knowledge, global presence and bespoke.",
  },
]

const Responsive = {
  0: {
    items: 1,
    margin: 5,
  },
  768: {
    items: 2,
    margin: 10,
  },
  1024: {
    items: 3,
    margin: 20,
  },
  
};
const FeatureCategory = () => {
  useEffect(() => {
    // Ensure jQuery is loaded only on the client side
    if (typeof window !== "undefined") {
      const $ = require("jquery");
      window.$ = window.jQuery = $;
    }
  }, []);
  return (
    <>
 <section class="bg-[#f8f5ff] px-4 md:px-10  md:py-8 ">
    <div class="flex  flex-col md:flex-row justify-between md:items-center py-16">
      <div class="flex flex-col text-start md:w-1/2">
        <span class="text-[#ffb600]">Vendor</span>
        <span class="text-[#022279] font-bold text-[28px] md:text-[40px]">Featured Providers</span>
      </div>
      <div class="md:w-1/2">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          usmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
    {/* <div class="flex gap-4 owl-carousel py-8 rounded-3xl"> */}
    <OwlCarousel
      className="owl-theme"
      responsive={Responsive}
      loop
      margin={20}
      nav={true}
      navText={[
        '<button class="prev bg-yellow-400 rounded-lg px-4 py-2 text-white">Prev</button>',
        '<button class="next bg-yellow-400 rounded-lg px-4 py-2 text-white">Next</button>',
      ]}
      
      // navText={['<button class="prev">Prev</button>', '<button class="next">Next</button>']}
      autoplay={true}
      autoplayTimeout={1000}
      autoplayHoverPause={true} 
    >

      {data.map((item,index)=>(
      <div key={index} class="mx-5 hover:bg-[#022279] shadow-md  bg-white duration-300 rounded-3xl group md:mx-5">
        <div class="flex justify-between md:px-8 px-4 py-4 items-center">
          <div class="bg-[#ffb600] flex justify-center items-center h-10 w-10 rounded-full">
          <IoIosCheckmark className='size-12'/>
          </div>
          <div class="flex flex-col items-center gap-">
            <a href="" class="text-[#022279] text-lg group-hover:text-white">{item.name}</a>
            <span class="text-[#adabb2] group-hover:text-white">{item.Addresss}</span>
          </div>
          <div class="">
            
            <IoMdHeartEmpty className='text-blue-400 size-8 group-hover:text-white font-bold text-xl'/>
          </div>
        </div>
        <div class="md:px-16 px-4 flex flex-col text-center items-center py-8 gap-4">
        
          <Image src={med} className="rounded-xl" alt="Picture of the author" />
          <p class="group-hover:text-white">
            {item.Description}
          </p>
          <div class="flex items-center gap-2">
          < FaStar className='text-yellow-400' />
          < FaStar className='text-yellow-400'/>
          < FaStar className='text-yellow-400'/>
          < FaStar className='text-yellow-400'/>
          < FaStar className='text-gray-600'/>
          </div>
          <button class="bg-yellow-400 rounded-lg flex justify-center items-center px-6 py-2 gap-2 text-center">
            <span>Request a Quote</span>
          </button>
        </div>
      </div>

      ))}
      

    </OwlCarousel>
    

    
  </section>
    </>
  )
}

export default FeatureCategory
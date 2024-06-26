import React from 'react'
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import logo from "../../../../public/assets/logo-dark.png";
import Image from 'next/image';
const Footer = () => {
  return (
    <>
     <section class="md:px-12 px-4 md:pt-24 pt-12 bg-[#f8f5ff]">
    <div class="space-y-20 ">
      <div class="flex flex-col md:flex-row justify-between items-center space-y-6 border rounded-xl border-[#022279]  p-4">
        <span class="text-2xl text-[#022279] font-semibold">Subscribe Our Newsletter</span>
        <div class="relative space-y-4 md:space-y-0 md:w-1/2 w-full">
          <input type="text" class="w-full h-fit p-2 border rounded-xl focus:border-red-200 focus:shadow-md"
            placeholder="Enter your Mail" />
          <button
            class="bg-[#ffb600] h-full border-[#ffb600] md:absolute md:top-0 md:right-0 rounded-xl flex justify-center items-center px-7 py-2 text-center">
            <span>Submit</span>
          </button>
        </div>
      </div>
      <div class="flex-col flex md:flex-row md:justify-between justify-center md:items-start items-baseline md:gap-0 gap-6 ">

        <div class="space-y-4 ">
          <span class="text-[#022279] text-lg font-bold">Site Links</span>
          <ul class="space-y-1">
            <li><a href="">Blog</a></li>
            <li><a href="">Contact Us</a></li>
            <li><a href="">Jobs</a></li>
            <li><a href="">Categories</a></li>
          </ul>
        </div>
        <div class="space-y-4 ">
          <span class="text-[#022279] text-lg font-bold">Popular Cities</span>
          <ul class="space-y-1">
            <li><a href="">Cambridge</a></li>
            <li><a href="">Ballston Lake</a></li>
            <li><a href="">Batumi</a></li>
            <li><a href="">Brooklyn</a></li>
          </ul>
        </div>
        <div class="space-y-4 ">
          <span class="text-[#022279] text-lg font-bold">Categories</span>
          <ul class="space-y-1">
            <li><a href="">Yoga Classes</a></li>
            <li><a href="">Transport</a></li>
            <li><a href="">Jobs</a></li>
            <li><a href="">Car Service</a></li>
          </ul>
        </div>
        <div class="space-y-4 ">
          <span class="text-[#022279] text-lg font-bold">Contact Info</span>
          <ul class="space-y-1">
            <li><a href="">India</a></li>
            <li><a href="">+41 232 525 5257</a></li>
            <li><a href="">+41 856 525 5369</a></li>
            <li><a href="">hello@Servicefinder.com</a></li>
          </ul>
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:items-center md:pl-20 pb-12">
        <div class="flex flex-col md:flex-row  items-center text-center justify-center gap-5 md:gap-16">
          
          <Image src={logo} alt="Picture of the author" />
          <span class=" text-sm">Copyright 2022 | Powered By Gonukkad. All Rights Reserved</span>
        </div>
        <div class="flex flex-col md:flex-row items-center justify-end  gap-5 w-full">
          <div class="bg-[#0c3479] h-[1px] w-full md:w-1/2"></div>

          <ul class="flex  items-center justify-center gap-4 text-lg">
            <TiSocialFacebook className='size-6'/>
            <FaXTwitter/>
            <FaLinkedinIn className='size-6'/>
            <FaInstagram/>
            
          </ul>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Footer
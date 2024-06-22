import React from 'react'

const Stats = () => {
  return (
    <>
     <section class="md:px-12 px-4  md:py-28">
    <div class="md:py-20 py-8 bg-[#022279] flex flex-col gap-16 rounded-3xl relative">
      <div class="flex flex-col justify-center items-center md:px-80 md:gap-5 gap-1">
        <span class="text-[#8d891f] leading-loose text-lg">STATICS</span>
        <span class="text-[24px] md:text-[40px] text-center leading-normal text-white font-semibold">Trusted by thousands of
          people all over the world</span>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-4  ">
        <div class="flex flex-col  text-white justify-center items-center">
          <span class="text-[60px] font-bold">36</span>
          <span class="md:text-lg">Providers</span>
        </div>
        <div class="flex flex-col  text-[#0cb6f5] md:border-l md:border-r justify-center items-center">
          <span class="text-[60px] font-bold">59</span>
          <span class="md:text-lg">Categories</span>
        </div>
        <div class="flex flex-col  text-[#ffb600] md:borde-r justify-center items-center">
          <span class="text-[60px] font-bold">108</span>
          <span class="md:text-lg">Jobs</span>
        </div>
        <div class="flex flex-col  text-[#6ab33e] md:border-l justify-center items-center">
          <span class="text-[60px] font-bold">89</span>
          <span class="md:text-lg">Customer</span>
        </div>
      </div>
    </div>
  </section>

  <section class="flex flex-col justify-center items-center gap-6 pb-12 pt-8">
    <div class="text-center px-8 flex flex-col gap-6 md:w-1/2">
      <h3 class="text-[20px] text-[#022279] font-semibold">
        We empower clients to grow their businesses based on the effective use
        of technology
      </h3>
      <span class="text-[14px]">Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. lorem Ipsum has been the standard dummy text ever since the
        1500s, when.
      </span>
    </div>
    <div class="relative  md:w-1/2 w-10/12">
      <input type="text" class="w-full h-fit p-2 border rounded-xl focus:border-red-200 focus:shadow-md"
        placeholder="Enter your Mail" />
      <button
        class="bg-[#ffb600] h-full border-[#ffb600] absolute top-0 right-0 rounded-xl flex justify-center items-center px-7 py-2 text-center">
        <span>Submit</span>
      </button>
    </div>
   
  </section>
    </>
  )
}

export default Stats
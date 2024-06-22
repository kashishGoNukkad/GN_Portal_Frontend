import React from "react";
import Image from "next/image";
import car from "../../../../public/assets/car.png";
import Scissors from "../../../../public/assets/Scissors.png";
import nurse from "../../../../public/assets/nurse.png";
import Electrician from "../../../../public/assets/Electrician.png";
import Yoga from "../../../../public/assets/yoga.png";
import spray from "../../../../public/assets/spray.png";
import GYM from "../../../../public/assets/bed.png";
import Transport from "../../../../public/assets/Truck.png";
import Ac from "../../../../public/assets/Ac.png";
import Admin from "../../../../public/assets/Admin.png";
import Book from "../../../../public/assets/book.png";
import Bulb from "../../../../public/assets/bulb.png";
import Arrowup from "../../../../public/assets/arrow-up.png";
import ArrowDown from "../../../../public/assets/arrow-down.png";

const popularCategory = () => {
  const data = [
    {
      image: car,
      ServiceName: "Car Service",
      no: "124 Listing",
    },
    {
      image: Scissors,
      ServiceName: "Salon Service",
      no: "124 Listing",
    },
    {
      image: nurse,
      ServiceName: "Plumber",
      no: "124 Listing",
    },
    {
      image: Electrician,
      ServiceName: "Electrician",
      no: "134 Listing",
    },
    {
      image: Yoga,
      ServiceName: "Yoga",
      no: "136 Listing",
    },
    {
      image: spray,
      ServiceName: "spray",
      no: "126 Listing",
    },
    {
      image: GYM,
      ServiceName: "GYM",
      no: "123 Listing",
    },
    {
      image: Transport,
      ServiceName: "TransPort",
      no: "123 Listing",
    },
    {
      image: Ac,
      ServiceName: "AC Repair",
      no: "153 Listing",
    },
  ];
  const stepsData = [
    {
      Number:"1",
      Image: Admin,
      Description: "Describe Your Task",
      Para: " This helps us determine which Taskers We are abest jobs.",
    },
    {
      Number:"2",
      Image: Admin,
      Description: "Describe Your Task",
      Para: " This helps us determine which Taskers We are abest jobs.",
    },
    {
      Number:"3",
      Image: Admin,
      Description: "Describe Your Task",
      Para: " This helps us determine which Taskers We are abest jobs.",
    },
  ];
  return (
    <>
      <section class="px-6">
        <div class="flex md:flex-row flex-col justify-between items-center md:py-16 py-12 gap-8">
          <div class="flex justify-center items-center md:items-start flex-col md:w-1/2 w-full">
            <span class="text-[#ffb600] md:text-[16px] text-[12px]">CATEGORIES</span>
            <span class="text-[#022279] font-bold md:text-[40px] text-[20px]">
              Popular Categories
            </span>
          </div>
          <div class="md:w-1/2 w-full">
            <p className="md:text-[18px] text-[12px] text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              usmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              id="card1"
              className="card border group relative before:w-full before:absolute before:left-1 before:h-full before:-z-10 before:-top-1 before:rounded-xl shadow-lg rounded-md"
            >
              <div className="relative h-full z-20 bg-white flex md:gap-4 gap-12 px-8 py-8 items-center rounded-xl shadow-[10px_10px_15px_-3px_rgb(0_0_0_/_0.1)]">
                <div className="bg-blue-200 flex justify-center items-center md:h-24 md:w-24 h-16 w-16 rounded-full relative overflow-hidden">
                  <Image
                    src={item.image}
                    className="size-8 md:size-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-y-[209%] group-hover:transition-all group-hover:duration-200"
                    alt={item.ServiceName}
                  />
                  <Image
                    src={item.image}
                    className="size-8 md:size-12 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-full group-hover:-translate-y-1/2 group-hover:transition-all group-hover:duration-200"
                    alt={item.ServiceName}
                  />
                </div>
                <div className="flex flex-col items-baseline gap-2">
                  <span className=" text-[#022279] font-bold ml-5">
                    <a className="md:text-[18px] text-[16px]" href="#">{item.ServiceName}</a>
                  </span>
                  <span className="text-[12px] md:text-[14px]">{item.no}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div class="flex justify-center items-center py-8">
          <button class="bg-[#ffb600] rounded-2xl flex justify-center items-center py-3 px-7 gap-2 text-center">
            <span>View All</span>
          </button>
        </div>

        {/* <!-- blue color div --> */}
        {/* <div class="py-20">
          <div class="bg-[#022279] rounded-2xl py-16">
            <div class="flex flex-col justify-center items-center">
              <span class="font-bold leading-9 text-[#bea800]">STEPS</span>
              <h2 class="text-[40px] font-bold text-white">How It Work</h2>
            </div>
            <div class="flex justify-center items-center px-12 gap-16">
              {stepsData.map((item,index)=>(
              <div key={index} class="flex flex-col items-center space-y-24">
                <div class="relative flex flex-col items-center">
                  <span class="text-8xl text-white">{item.Number}</span>
                  <div class="bg-[#ffb600] absolute -bottom-[70px] flex  justify-center items-center h-24 w-24 rounded-full  overflow-hidden">
                    <Image
                      src={item.Image}
                      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-y-[250%] group-hover:transition-all group-hover:duration-200"
                      alt=""
                    />
                    <Image
                     src={item.Image}
                      class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[116%] group-hover:-translate-y-1/2 group-hover:transition-all group-hover:duration-200"
                      alt=""
                    />
                  </div>
                </div>
                <div class="text-center text-white">
                  <h4 class="text-[18px] font-semibold">{item.Description}</h4>
                  <p>
                   {item.Para}
                  </p>
                </div>
              </div>

              ))}
            </div>
          </div>
        </div> */}
         <div class="py-20">
      <div class="bg-[#022279] rounded-2xl py-16">
        <div class="flex flex-col justify-center items-center mb-8 lg:mb-0">
          <span class="font-bold leading-9 text-[#bea800]">STEPS</span>
          <h2 class="md:text-[40px] text-[25px] font-bold text-white">How It Work</h2>
        </div>
        <div class="flex md:flex-row flex-col justify-center items-center px-12 lg:gap-16 gap-8">
          <div class="flex flex-col items-center lg:space-y-24 space-y-16">
            <div class="relative flex flex-col items-center">
              <span class="lg:text-8xl text-6xl text-white">01</span>
              <div class="bg-[#ffb600] absolute md:-bottom-16 -bottom-10 flex  justify-center items-center md:h-24 md:w-24 h-16 w-16 rounded-full  overflow-hidden">
                <Image src={Admin} class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:-translate-y-[250%] group-hover:transition-all group-hover:duration-200" alt="" />
                <Image src={Admin} class="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[116%] group-hover:-translate-y-1/2 group-hover:transition-all group-hover:duration-200" alt=""/>
              </div>
            </div>
            <div class="text-center text-white">
              <h4 class="md:text-[18px] text-[14px] font-semibold">Describe Your Task</h4>
              <p className="text-[12px] lg:text-[18px]">This helps us determine which Taskers We are abest jobs.</p>
            </div>
          </div>
          <div class="flex items-center">
            <div className="hidden lg:block">
            <Image src={ArrowDown} alt="" class="scale-150" />
            </div>
            <div class="flex flex-col items-center lg:space-y-24 space-y-16">
              <div class="relative flex flex-col items-center">
                <span class="lg:text-8xl text-6xl text-white">02</span>
                <div class="bg-[#ffb600] absolute md:-bottom-16 -bottom-10 flex  justify-center items-center md:h-24 md:w-24 h-16 w-16 rounded-full  overflow-hidden">
                  <Image src={Book} alt="" />
                </div>
              </div>
              <div class="text-center text-white">
                <h4 class="md:text-[18px] text-[14px] font-semibold">Choose a Tasker</h4>
                <p className="text-[12px] lg:text-[18px]">
                  This helps us determine which Taskers We are abest jobs.
                </p>
              </div>
            </div>
            <div className="hidden lg:block">
              <Image src={Arrowup} alt="" class="scale-150" />
            </div>
          </div>
          <div class="flex flex-col items-center lg:space-y-24 space-y-16">
            <div class="relative flex flex-col items-center">
              <span class="lg:text-8xl text-6xl text-white">03</span>
              <div class="bg-[#ffb600] absolute md:-bottom-16 -bottom-10 flex  justify-center items-center md:h-24 md:w-24 h-16 w-16 rounded-full  overflow-hidden">
              <Image src={Bulb} alt="" />
              </div>
            </div>
            <div class="text-center text-white">
              <h4 class="md:text-[18px] text-[14px] font-semibold">Live Smarter</h4>
              <p className="text-[12px] lg:text-[18px]">This helps us determine which Taskers We are abest jobs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </>
  );
};

export default popularCategory;

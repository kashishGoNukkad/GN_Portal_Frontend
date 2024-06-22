import React from 'react'
import Image from 'next/image'
import pic from '../../../../public/assets/pic1.jpeg'
import users from '../../../../public/assets/users.png'
import market from '../../../../public/assets/market.png'
import Single from '../../../../public/assets/Single.png'
const ChooseUS = () => {
  return (
    <>
    <section>
    <div class="md:px-12 px-4 py-28">
      <div class="flex bg-[#022279] md:flex-row flex-col items-center rounded-3xl md:px-16 px-8">
        <div class="md:w-1/2 w-full">

          

          <div class="flex flex-col gap-8 md:gap-12 justify-center items-center">
            
          <div class="text-start md:text-center space-y-3 md:space-y-0 md:py-12 py-2 pt-8">
              <span class="text-[#ffb600] md:text-2xl tracking-[3px] text-sm  ">CHOOSE</span>
              <h2 class=" text-[28px] md:text-[40px] text-white font-bold">Why Choose us</h2>
              <p class="text-white text-sm">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
          </div>

           
            <div class="flex flex-col gap-10">

              <div class="flex md:flex-row flex-col md:items-center md:gap-5 gap-2">
                <div class="bg-white flex justify-center items-center h-20 w-20 md:w-28 rounded-2xl">
                  <Image src={users}  alt="Picture of the author" />
                </div>
                <div class="flex flex-col gap-2">
                  <h4 class="text-[#ffb600] text-[18px] font-bold">
                    Meet new customers
                  </h4>
                  <p class="text-white text-sm">
                    Suspendisse tincidunt rutrum ante. Vestibulum elementum
                    ipsum sit amet turpis elementum lobortis.
                  </p>
                </div>
              </div>

              <div class="flex md:flex-row flex-col md:items-center md:gap-5 gap-2">
                <div class="bg-white flex justify-center items-center h-20 w-20 md:w-28 rounded-2xl">
                  
                  <Image src={market}  alt="Picture of the author" />
                </div>
                <div class="flex flex-col gap-2">
                  <h4 class="text-[#ffb600] text-[18px] font-bold">
                    Grow your revenue
                  </h4>
                  <p class="text-white text-sm">
                    Suspendisse tincidunt rutrum ante. Vestibulum elementum
                    ipsum sit amet turpis elementum lobortis.
                  </p>
                </div>
              </div>

              <div class="flex md:flex-row flex-col md:items-center md:gap-5 gap-2">
                <div class="bg-white flex justify-center items-center h-20 w-20 md:w-28 rounded-2xl">
                  <img src="./style/assets/Single.png" alt="" />
                  <Image src={Single}  alt="Picture of the author" />
                </div>
                <div class="flex flex-col gap-2">
                  <h4 class="text-[#ffb600] text-[18px] font-bold">
                    Build your online reputation
                  </h4>
                  <p class="text-white text-sm">
                    Suspendisse tincidunt rutrum ante. Vestibulum elementum
                    ipsum sit amet turpis elementum lobortis.
                  </p>
                </div>
              </div>

            </div>
          
          </div>
        </div>

        <div class="md:w-1/2 w-full md:px-8 px-2 md:py-16 py-8 md:mt-14 mt-0">
          <Image src={pic} className="rounded-3xl" alt="Picture of the author" />
        </div>

      </div>
    </div>
  </section>
    </>
  )
}

export default ChooseUS
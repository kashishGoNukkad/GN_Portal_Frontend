"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import img from "../../../../public/assets/Electrician.png";
import men from "../../../../public/assets/1.png";
import downarrow from "../../../../public/assets/Category/down.png";
import axios from "axios";
import Link from "next/link";
import { searchResult } from "../../Redux/slice"
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
const SearchComponent = () => {
 

  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({ name: "Select Category", icon: "" });
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState({ lat: 19.7554798, lng: 75.7108884 });
  const [results, setResults] = useState('');
  const dispatch = useDispatch();

  const dropdownRef = useRef(null); 
  const router = useRouter();

  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    
    if (isDropdownVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }


    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownVisible]);

  // const getLocation = async () => {
  //   if (!navigator.geolocation) {
      
  //     throw new Error('Geolocation not supported');
  //   }

  //   try {
  //     const position = await new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(resolve, reject);
  //     });

  //     const coords = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     };

  //     setLocation(coords);
  //     console.log(coords);

  //     return coords;
  //   } catch (error) {
  //     console.error('Error in getting location', error);
  //     throw error;
  //   }
  // };

  const handleSearch = async (event) => {
    event.preventDefault();
  
    try {
      // const currentLocation = await getLocation();
      const currentLocation = location;
      console.log("Kashish");
      // if (currentLocation.lat && currentLocation.lng && query) {
      //   console.log("Kashish2");
  
        const response = await axios.post('http://localhost:3001/search', {
          query,
          location: currentLocation,
          // location: lo
        });
  
        console.log(response.data.services);
  
        setResults(response.data.services); // Ensure to set only the services part
        console.log(results);
  
        localStorage.setItem("services", JSON.stringify(response.data.services)); // Convert to string before storing
      // }
    } catch (error) {
      console.error('Error searching services', error);
    }
    router.push(`/home/${query}`);
  };
  

// const searchDispatch = ()=>{
//   dispatch(searchResult(results))
// }

//   useEffect(()=>{
//     searchDispatch()
//   },[])

  const categories = [
    { name: "Cab Service", icon: "/style/assets/Category/cat-1.jpeg" },
    { name: "Food & Drink", icon: "/style/assets/Category/cat-1.jpeg" },
    { name: "Plumber", icon: "/style/assets/Category/cat-1.jpeg" },
    { name: "Electrician", icon: "/style/assets/Category/cat-1.jpeg" },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
  };


  return (
    <section className="md:mt-0 mt-8">
      <div className="md:flex justify-center md:space-y-0 space-y-16 items-center   md:gap-20">
      <div className="md:w-1/2 w-full space-y-8 md:space-y-12 md:px-20 px-4">
        <h1 className="md:text-[56px] text-[28px] text-[#022279]">
          Hire <span className="text-[#ffbb21]">Experts</span> & <br />
          <span className="text-xxl font-semibold">Get Your Job Done</span>
        </h1>
        <hr className="h-[3px] w-full bg-[#ffb600]" />
        <div className="">
          <form onSubmit={handleSearch} >
            <div className="flex  h-full flex-col md:gap-0  *:py-3  *:px-2   gap-3 md:flex-row rounded-sm md:w-[38vw] w-full p-1  bg-[#f2f5fb]">
              <div className="border bg-white md:w-5/12 ">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search Keywords"
                  className="outline-none "
                />
              </div>
              <div ref={dropdownRef} className="relative border flex items-center md:w-5/12 h-full  bg-white cursor-pointer" onClick={toggleDropdown}>
                <div className="w-full ">
                  <div className="flex  justify-between items-center w-full">
                    {selectedCategory.icon && (
                      <Image height="24" width="24" src={selectedCategory.icon} className="h-6 w-6 rounded-full mr-2" alt="Category Icon" />
                    )}
                    <span>{selectedCategory.name}</span>
                    <i className="fa fa-caret-down ml-2"></i>
                  </div>
                </div>
                {isDropdownVisible && (
                  <div className="absolute left-0 top-full border mt-2 w-full bg-white shadow-md rounded-md">
                    {categories.map((category, index) => (
                      <div
                        key={index}
                        className="p-2 hover:bg-gray-100 flex items-center dropdown-item"
                        onClick={() => selectCategory(category)}
                      >
                        <Image height="24" width="24" src={category.icon} className="h-6 w-6 rounded-full mr-2" alt="Category Icon" />
                        <span>{category.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border  !px-0 !py-0 h-full ">
                <button type="submit"  onClick={handleSearch}  className=" px-5 py-3  w-full  bg-[#ffb600] text-white">Search</button>
              </div>
            </div>
          </form>
        </div>
      </div>
        <div className="md:w-1/2 w-full md:px-0 px-12 md:py-0 py-8">
          <div className="md:w-[80%] w-full relative">
            <div className="-z-10 absolute bottom-0 w-full h-[70%] rotate-[10deg] rounded-2xl bg-[#ffb600] "></div>
            <div className="-z-10 absolute bottom-0 w-full h-[70%] rounded-2xl bg-[#022278] "></div>

            <div className="w-fit mx-auto">
            <Image src={men} className="" alt="Picture of the author" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchComponent;

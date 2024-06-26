'use client'
import React, { useEffect, useState } from 'react';
import TempHeader from '@/app/admindashboard/Components/TempHeader';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';

const Page = () => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  useEffect(()=>{
  setServices(services);
    setFilteredServices(services);
    setCategories([...new Set(services.map(service => service.category))]);
  }, []);


  const getLocation = async () => {
    if (!navigator.geolocation) {
      
      throw new Error('Geolocation not supported');
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      setLocation(coords);
      console.log(coords);

      return coords;
    } catch (error) {
      console.error('Error in getting location', error);
      throw error;
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
  
    try {
      const currentLocation = await getLocation();
      console.log("Kashish");
      if (currentLocation.lat && currentLocation.lng && query) {
        console.log("Kashish2");
  
        const response = await axios.post('http://localhost:3001/search', {
          query,
          location: currentLocation,
        });
  
        console.log(response.data.services);
  
        setServices(response.data.services); // Ensure to set only the services part
       
  
        localStorage.setItem("services", JSON.stringify(response.data.services)); // Convert to string before storing
      }
    } catch (error) {
      console.error('Error searching services', error);
    }
    
  };

//     useEffect(() => {
//     // Filter services based on the search query
//     const filterServices = () => {
//       const filtered = services.filter(service =>
//         service.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setServices(filtered);
//     };

//     filterServices();
//   }, [query, services]);


  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services"));
    if (storedServices) {
      setServices(storedServices);
    }
  }, []);

//   return (
//     <>
//     <TempHeader/>
//     <div className="min-h-screen bg-gray-100 py-10">
//       <div className="container mx-auto">
//         {services.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((service, index) => (
//               <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
//                 <h2 className="text-xl font-semibold text-blue-600 mb-2">{service.name}</h2>
//                 <p className="text-gray-700 mb-4">{service.address}</p>
//                 <p className="text-gray-500">
//                   Location: {service.location.lat}, {service.location.lng}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 text-lg">No service available</p>
//         )}
//       </div>
//     </div>
//     <div className='grid grid-cols-2'>
// <div className='h-screen bg-red-100'>

// </div>
// <div className='h-screen bg-red-100'>
// <div className="flex  justify-center  h-[50vh] bg-gray-100">
//       <div className=" py-16 px-4 rounded-lg relative w-full">
//         <form className="flex items-center ">
//           <input
//             type="text"
//             className="flex-grow shadow-lg p-4 rounded-2xl border-2 w-full border-gray-200 focus:outline-none outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
//             placeholder="Search..."
//           />
//           {/* <button
//             type="submit"
//             className="p-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
//           >
//             Search
//           </button> */}
//           <div className='cursor-pointer absolute right-8 bg-white'>
//           <CiSearch className=' size-7' />
//           </div>
//         </form>
//       </div>
//     </div>
// <div className='h-[50vh] bg-green-100'>

// </div>
// </div>
//     </div>

//     </>
//   );



return (
    <>
      <TempHeader />

      <div className='flex flex-row'>
      <div className='h-screen w-[25vw] bg-gray-200 p-4 overflow-y-scroll'>
          <h2 className="text-xl font-bold mb-4">Filters</h2>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              className="p-2 border rounded w-full"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value=''>All Categories</option>
              <option value='Restaurant'>Restaurant</option>
              <option value='Automobile'>Automobile</option>
              <option value='Electronics'>Electronics</option>
              <option value='Sports'>Sports</option>
              {/* {categories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))} */}
            </select>
          </div>
        </div>
        <div className='h-full w-[75vw] bg-red-100'>
          <div className="flex justify-center flex-col gap-20 bg-gray-100">
            <div className="py-8 px-4 rounded-lg relative w-full">
              <form className="flex items-center">
                <input
                  type="text"
                  className="flex-grow shadow-lg p-4 rounded-2xl border-2 w-full border-gray-200 focus:outline-none outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <div className='cursor-pointer absolute right-8 bg-white'>
                  <CiSearch onClick={handleSearch} className='size-7' />
                </div>
              </form>
            </div>
          </div>
          <div className=' bg-green-100 overflow-auto overflow-y-scroll'>
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="p-4 m-2 bg-white shadow-md rounded-lg">
                  <h2 className="text-xl font-bold">{service.name}</h2>
                  <p>{service.address}</p>
                  <p>Location: {service.location.lat}, {service.location.lng}</p>
                </div>
              ))
            ) : (
              <p className="p-4">No services available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );


};

export default Page;

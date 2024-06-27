'use client'
import React, { useEffect, useState } from 'react';
import TempHeader from '@/app/admindashboard/Components/TempHeader';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';

const Page = () => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState({ lat: 19.7554798, lng: 75.7108884 });
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');


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
      // const currentLocation = location;
      console.log("Kashish");
      if (currentLocation.lat && currentLocation.lng && query) {
        console.log("Kashish2");
  
        const response = await axios.post('http://localhost:3001/search', {
          query,
          location: currentLocation,
        });
  
        console.log(response.data.services);
  
        setServices(response.data.services); 
       
  
        localStorage.setItem("services", JSON.stringify(response.data.services)); 

        const uniqueCategories = [...new Set(response.data.services.map(service => service.category))];
        setCategories(uniqueCategories);
        const uniquePrices = [...new Set(response.data.services.map(service => service.price))];
        setPrices(uniquePrices);
      }
    } catch (error) {
      console.error('Error searching services', error);
    }
    
  };

  // Load services from local storage on component mount
  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem("services"));
    if (storedServices) {
      setServices(storedServices);

      // Extract unique categories
      const uniqueCategories = [...new Set(storedServices.map(service => service.category))];
      setCategories(uniqueCategories);
      const uniquePrices = [...new Set(storedServices.map(service => service.price))];
        setPrices(uniquePrices);
    }
  }, []);
  
  // FilterComponent to handle filters
  const FilterComponent = ({ categories = [] }) => {
    const [selectedFilters, setSelectedFilters] = useState({
      Category: [],
      PriceRange: [],
      filter3: [],
      filter4: []
    });

    const [showMore, setShowMore] = useState({
      category: false,
      filter2: false,
      filter3: false,
      filter4: false
    });

    const filters = {
      Category: categories,
      PriceRange: prices,
      filter3: ['Option 3-1', 'Option 3-2', 'Option 3-3', 'Option 3-4', 'Option 3-5', 'Option 3-6', 'Option 3-7', 'Option 3-8', 'Option 3-9', 'Option 3-10'],
      filter4: ['Option 4-1', 'Option 4-2', 'Option 4-3', 'Option 4-4', 'Option 4-5', 'Option 4-6', 'Option 4-7', 'Option 4-8', 'Option 4-9', 'Option 4-10']
    };

    // Handle filter changes
    const handleFilterChange = (filterName, option) => {
      setSelectedFilters(prevSelectedFilters => {
        const filterArray = prevSelectedFilters[filterName];
        let newSelectedFilters;
        if (filterArray.includes(option)) {
          newSelectedFilters = {
            ...prevSelectedFilters,
            [filterName]: filterArray.filter(item => item !== option)
          };
        } else {
          newSelectedFilters = {
            ...prevSelectedFilters,
            [filterName]: [...filterArray, option]
          };
        }
        console.log('Selected Filters:', newSelectedFilters);
        return newSelectedFilters;
      });
    };

    // Handle showing more/less options
    const handleShowMore = (filterName) => {
      setShowMore(prevShowMore => ({
        ...prevShowMore,
        [filterName]: !prevShowMore[filterName]
      }));
    };

    // Render filter section
    const renderFilterSection = (filterName, filterOptions) => {
      const isExpanded = showMore[filterName];
      const optionsToShow = isExpanded ? filterOptions : filterOptions.slice(0, 5);

      return (
        <div className="mb-4" key={filterName}>
          <label className="block mb-2">{filterName.charAt(0).toUpperCase() + filterName.slice(1)}</label>
          {optionsToShow.map((option, index) => (
            <div key={index} className="mb-2">
              <input
                type="checkbox"
                id={`${filterName}-${index}`}
                value={option}
                checked={selectedFilters[filterName].includes(option)}
                onChange={() => handleFilterChange(filterName, option)}
                className="mr-2"
              />
              <label htmlFor={`${filterName}-${index}`}>{option}</label>
            </div>
          ))}
          {filterOptions.length > 5 && (
            <button
              type="button"
              onClick={() => handleShowMore(filterName)}
              className="text-blue-500 underline"
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>
      );
    };

    return (
      <div className="h-screen w-[25vw] bg-gray-200 p-4 overflow-y-scroll">
        <h2 className="text-xl font-bold mb-4">Filters</h2>
        {Object.keys(filters).map(filterName => renderFilterSection(filterName, filters[filterName]))}
        <button
          type="button"
          className="mt-4 bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </div>
    );
  };

  return (
    <>
      <TempHeader />
      <div className='flex flex-row'>
        {/* Pass the categories prop to FilterComponent */}
        <FilterComponent categories={categories} />
        <div className='h-screen w-[75vw] bg-red-100'>
          <div className="flex justify-center flex-col gap-20 bg-gray-100">
            <div className="py-8 px-4 rounded-lg relative w-full">
              <form className="flex items-center" onSubmit={handleSearch}>
                <input
                  type="text"
                  className="flex-grow shadow-lg p-4 rounded-2xl border-2 w-full border-gray-200 focus:outline-none outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Search..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className='cursor-pointer absolute right-8 bg-white'>
                  <CiSearch className='size-7' />
                </button>
              </form>
            </div>
          </div>
          <div className='bg-green-100 h-screen overflow-auto overflow-y-scroll'>
            {services.length > 0 ? (
              services.map((service, index) => (
                <div key={index} className="p-4 m-2 bg-white shadow-md rounded-lg">
                  <h2 className="text-xl font-bold"><strong>{service.name}</strong></h2>
                  <p><strong>Category:</strong> {service.category}</p>
                  <p><strong>Price:</strong> {service.price}</p>
                  <p><strong>Address:</strong>{service.address}</p>
                  <p><strong>Location:</strong> {service.location.lat}, {service.location.lng}</p>
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

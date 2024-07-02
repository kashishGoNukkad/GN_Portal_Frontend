'use client'
import React, { useEffect, useState } from 'react';
import TempHeader from '@/app/admindashboard/Components/TempHeader';
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import ReactSlider from 'react-slider';
import './custom.css'


const Page = () => {
  const [services, setServices] = useState([]);
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState({ lat: 19.7554798, lng: 75.7108884 });
  const [filteredServices, setFilteredServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    Category: [],
    price: [0, 1000],
  });


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
        });
  
        console.log(response.data.services);
  
        setServices(response.data.services); 
       
  
        localStorage.setItem("services", JSON.stringify(response.data.services)); 

        const uniqueCategories = [...new Set(response.data.services.map(service => service.category))];
        setCategories(uniqueCategories);


        const uniquePrices = [...new Set(response.data.services.map(service => service.price))];
        setPrices(uniquePrices);
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


  useEffect(() => {
    const filtered = services.filter(service => {
      return (
        (selectedFilters.Category.length === 0 || selectedFilters.Category.includes(service.category)) &&
        (service.price >= selectedFilters.price[0] && service.price <= selectedFilters.price[1])
      );
    });
    setFilteredServices(filtered);
  }, [services, selectedFilters]);

  const FilterComponent = ({ categories = [] }) => {
    const [showMore, setShowMore] = useState({
      category: false,
    });

    const filters = {
      Category: categories,
      price: selectedFilters.price,
    };

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
        return newSelectedFilters;
      });
    };

    const handleShowMore = (filterName) => {
      setShowMore(prevShowMore => ({
        ...prevShowMore,
        [filterName]: !prevShowMore[filterName]
      }));
    };

    const handlePriceChange = (priceRange) => {
      setSelectedFilters(prevSelectedFilters => ({
        ...prevSelectedFilters,
        price: priceRange
      }));
    };
  
    const renderFilterSection = (filterName, filterOptions) => {
      const isExpanded = showMore[filterName];
      const optionsToShow = isExpanded ? filterOptions : filterOptions.slice(0, 5);

      if (filterName === 'price') {
        return (
          <div className="mb-4" key={filterName}>
            <label className="block mb-2">Price Range</label>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="thumb"
              trackClassName="track"
              defaultValue={selectedFilters.price}
              ariaLabel={['Lower thumb', 'Upper thumb']}
              ariaValuetext={state => `Thumb value ${state.valueNow}`}
              pearling
              minDistance={10}
              min={0}
              max={1000}
              value={selectedFilters.price}
              onChange={handlePriceChange}
            />
            <div className="flex justify-between mt-2">
              <span>{selectedFilters.price[0]}</span>
              <span>{selectedFilters.price[1]}</span>
            </div>
          </div>
        );
      }

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
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
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
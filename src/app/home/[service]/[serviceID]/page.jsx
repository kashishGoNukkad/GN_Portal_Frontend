'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import TempHeader from '@/app/admindashboard/Components/TempHeader';
import { useRouter } from 'next/navigation';
import Modal from "../../../admindashboard/Components/Modal";
import cookie from 'cookie';
import axios from 'axios';

const ServiceDetails = () => {
    const router = useRouter();
  const searchParams = useSearchParams();
  const servicename = searchParams.get('servicename');
  const [service, setService] = useState(null);
  const [isLoggedIn, setIsLoggedIn]= useState(false)

  useEffect(() => {
    if (servicename) {
      const storedServices = JSON.parse(localStorage.getItem("services"));
      const service = storedServices.find(service => service.name === servicename);
      setService(service);
    }
  }, [servicename]);

  if (!service) {
    return <p>Loading...</p>;
  }
const GetService = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getservice', { withCredentials: true });
      if (response.status === 200) {
        console.log("Successfully retrieved service:", response.data);
        
      } else {
        console.log("Error retrieving service:", response.status);
        setIsLoggedIn(true)
      }
    } catch (error) {
      console.error('Error retrieving service:', error);
    }
  };

  return (
    <>
      <TempHeader />
      <div className="p-4">
        <h1 className="text-2xl font-bold">{service.name}</h1>
        <p><strong>Category:</strong> {service.category}</p>
        <p><strong>Price:</strong> {service.price}</p>
        <p><strong>Address:</strong> {service.address}</p>
        <p><strong>Location:</strong> {service.location.lat}, {service.location.lng}</p>
        {/* Add other service details as needed */}
        <div className='flex gap-8'>
        <button onClick={() => router.back()} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Go Back
        </button>
        <button onClick={GetService} className="mt-4 bg-blue-500 text-white p-2 rounded">
          Get Service
        </button>
        </div>
      </div>
      {isLoggedIn ? (
  <Modal />
) : (
  <button className="mt-4 bg-blue-500 text-white p-2 rounded">
    Done
  </button>
)}

      
    </>
  );
};

export default ServiceDetails;

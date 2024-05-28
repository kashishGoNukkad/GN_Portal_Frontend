'use client'
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";

const Analytics = () => {
    // const [data1, setData1] = useState([]);
    
 
useEffect(() => {
    const fetchVendors = async () => {
    
        const response = await axios.get('http://localhost:3001/allvendors');
        console.log("All Vendors:", response.data);
        // setData1(response.data);
      
    };
  fetchVendors();
}, []);

  return (
    <div>page</div>
  )
}

export default Analytics
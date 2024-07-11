import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Redux/Slices/authSlice'

const ProfileModal = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const { user, sessionId, status } = useSelector((state) => state.auth);


  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [lastAddress, setLastAddress] = useState({ city: '', state: '', pincode: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(()=>{
    setName(user.name);
    setEmail(user.email);
    setMobile(user.mobile);
    setLastAddress({ city: user.city || '', state: user.state || '', pincode: user.pincode || '' });
  },[user])

  // console.log("MY DATA: ", data)

  // useEffect(() => {
  //   if (data) {
  //     setName(data.name || "");
  //     setMobile(data.mobile || "");
  //     setEmail(data.email || "");
  //     setLastAddress({ city: data.city || '', state: data.state || '', pincode: data.pincode || '' });
  //   }
  //   // fetchData();
  // }, [data]);

  // console.log("MY NAME: ", name)
  useEffect(() => {
    const fetchData = async () => {
      if (!email) return;

      setLoading(true);
      setError(null);

      try {
       
        // const response = await axios.get('http://localhost:3001/userprofile',  {email}  );
        const response = await axios.get(`http://localhost:3001/userprofile?email=${encodeURIComponent(email)}`);
        const userData = response.data;
     
        setName(userData.name);
        setMobile(userData.mobile);
        // setEmail(userData.email);
        
        setLastAddress({ city: userData.city, state: userData.state, pincode: userData.pincode });
      } catch (error) {
        setError("Failed to fetch profile data. Please try again.");
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  },[email]);

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  const handleAddressChange = (field, value) => {
    setLastAddress({ ...lastAddress, [field]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    try {
      const profileData = {
        name,
        mobile,
        email,
        city: lastAddress.city,
        state: lastAddress.state,
        pincode: lastAddress.pincode
      };
      // dispatch(loginSuccess(response.data));

      await axios.put('http://localhost:3001/profile', profileData);
      onClose();
    } catch (error) {
      setError("Failed to update profile. Please try again.");
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="z-50 fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
      <div className="modal-content bg-white w-10/12 p-8">
        <div className='flex justify-between'>
          <h2 className='py-4'>Profile Information</h2>
          <div className="place-self-end cursor-pointer bg-white p-2 rounded-full"><RxCross1 onClick={onClose} /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full  border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City:</label>
            <input
              type="text"
              id="city"
              value={lastAddress.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className="w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State:</label>
            <input
              type="text"
              id="state"
              value={lastAddress.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              className="w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">Pincode:</label>
            <input
              type="text"
              id="pincode"
              value={lastAddress.pincode}
              onChange={(e) => handleAddressChange('pincode', e.target.value)}
              className="w-full border-gray-300 rounded-md outline-none shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="flex justify-end mt-4">
          <button onClick={handleSubmit} disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            {loading ? 'Saving...' : 'Save'}
          </button>
          <button onClick={onClose} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Close</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
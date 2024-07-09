import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const ProfileModal = ({ isOpen, onClose, tempData }) => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [lastAddress, setLastAddress] = useState([
    { city: '', state: '', pincode: '' }
  ]);

  console.log(tempData.name);

  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onClose();
  };

  const handleAddressChange = (index, field, value) => {
    const updatedAddress = [...lastAddress];
    updatedAddress[index][field] = value;
    setLastAddress(updatedAddress);
  };

  return (
    <div className="z-50  fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm flex justify-center items-center" id="wrapper" onClick={handleClose}>
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
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile:</label>
            <input
              type="tel"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            {phoneError && <p className="text-red-500 text-xs mt-1">{phoneError}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          {lastAddress.map((address, index) => (
            <React.Fragment key={index}>
              <div>
                <label htmlFor={`city_${index}`} className="block text-sm font-medium text-gray-700 mb-1">City:</label>
                <input
                  type="text"
                  id={`city_${index}`}
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, 'city', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor={`state_${index}`} className="block text-sm font-medium text-gray-700 mb-1">State:</label>
                <input
                  type="text"
                  id={`state_${index}`}
                  value={address.state}
                  onChange={(e) => handleAddressChange(index, 'state', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor={`pincode_${index}`} className="block text-sm font-medium text-gray-700 mb-1">Pincode:</label>
                <input
                  type="text"
                  id={`pincode_${index}`}
                  value={address.pincode}
                  onChange={(e) => handleAddressChange(index, 'pincode', e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </React.Fragment>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;

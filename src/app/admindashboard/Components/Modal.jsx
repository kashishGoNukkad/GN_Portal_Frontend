import React from 'react';
import { RxCross1 } from 'react-icons/rx';
import svg from '../../../../public/Login.svg'
import Image from 'next/image';
Image
const Modal = ({ Isvisible, onclose,children }) => {
  if (!Isvisible) return null;

  const handleClose = (e) => {
    if (e.target.id === 'wrapper') onclose();
  };

  return (
    <div
      className="z-50  fixed inset-0 bg-opacity-25  bg-black backdrop-blur-sm flex justify-center items-center"
      id="wrapper"
      onClick={handleClose}
    >
      <div className="w-[500px] flex flex-col  gap-3">
        <div className="place-self-end cursor-pointer bg-white p-2 rounded-full "><RxCross1 onClick={onclose}  /></div>
       
        <div className="p-6  bg-white rounded-lg space-y-4">
        <div className='font-semibold text-lg '>
<span>Signup / Login</span>
        </div>
          {children}
        </div>
         
      </div>
    </div>
  );
};

export default Modal;

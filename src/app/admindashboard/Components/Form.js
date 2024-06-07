import React from 'react'

const Form = () => {
  return (
    <>
     <form className="bg-gray-100 p-10 space-y-6 w-[80%] h-full rounded-md">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl mb-4">Vendor data</h2>
                <RxCross2 className="cursor-pointer size-6" onClick={hide} />
              </div>
              <div className="grid grid-cols-2 gap-8">
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                {formfiled.map((field, index) => (
                  <div className="relative" key={index}>
                    <input
                      type={field.type}
                      value={formData[field.label]}
                      onChange={(e) => handleInputChange(e, field.label)}
                      id={field.label}
                      className="block rounded-md px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                    />
                    <label
                      htmlFor={field.label}
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
                    >
                      {field.label}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-4 items-center">
                <button
                  type="button"
                  onClick={handleAdd}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  Create
                </button>
                <button
                  type="button"
                  onClick={hide}
                  className="bg-[#ec3e20] text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
    </>
  )
}

export default Form
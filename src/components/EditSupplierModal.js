import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";

const EditSupplierModal = ({
  handleCancel,
  email,
  name,
  address,
  phoneNo,
  expectedDelivery,
  _id,
  status,
}) => {
  const [data, setData] = useState({
    name,
    address,
    phoneNo,
    email,
    expectedDelivery,
    status,
  });

  const formStyle = {
    width: "800px",
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name, Value", `${name}-${value}`);
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:4000/api/suppliers", data);
      console.log("Supplier Update Successfully");
      handleCancel();
      toast.success("Supplier Update Successfull!");
    } catch (e) {
      console.log("error", e.message);
      toast.error("Error Adding Supplier");
    }
  };

  console.log("Supplier Data Email", email);
  console.log("Supplier Data Name", name);
  console.log("Supplier Data Status", status);

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-1 px-1 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
        &#8203;
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-1 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Edit Supplier
                </h3>
                <div className="mt-2">
                  <form
                    className="sm:max-w-4xl mx-auto px-4 py-4 sm:rounded-lg sm:border mt-8"
                    style={formStyle}
                  >
                    <div className="header"></div>
                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-5 md:mb-0 pr-4"
                          htmlFor="inline-name"
                        >
                          Supplier Name
                        </label>
                      </div>
                      <div className="md:w-2/3 flex flex-col justify-start">
                        <input
                          className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
                          id="inline-name"
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-address"
                        >
                          Address
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
                          id="inline-address"
                          type="text"
                          name="address"
                          value={data.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-phoneNo"
                        >
                          Phone No
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
                          id="inline-phoneNo"
                          type="text"
                          name="phoneNo"
                          value={data.phoneNo}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-email"
                        >
                          Email
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
                          id="inline-email"
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3 -mt-6">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-1  mt-5 md:mb-0 pr-4"
                          htmlFor="inline-expectedDelivery"
                        >
                          Expected Delivery
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <input
                          className="bg-gray-200 appearance-none border border-gray-200 rounded w-24 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
                          id="inline-expectedDelivery"
                          type="text"
                          name="expectedDelivery"
                          value={data.expectedDelivery}
                          onChange={handleChange}
                        />
                        <span> Days </span>
                      </div>
                    </div>

                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-role"
                        >
                          Change Active Status
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div>
                          <input
                            type="radio"
                            class="form-radio"
                            name="status"
                            value="active"
                            onChange={handleChange}
                          />
                          <span class="ml-2">Active</span>

                          <input
                            type="radio"
                            className="form-radio ml-8"
                            name="status"
                            value="inactive"
                            selected={true}
                            onChange={handleChange}
                          />
                          <span class="ml-2">Inactive</span>
                        </div>
                      </div>
                    </div>
                    <div className="md:flex md:items-center mb-3">
                      <div className="md:w-1/3 mt-0">
                        <label
                          className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
                          htmlFor="inline-role"
                        >
                          Active Status
                        </label>
                      </div>
                      <div className="md:w-2/3">
                        <div>
                          <span>{status}</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Close
              </button>
            </span>
            <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto mr-4">
              <button
                type="button"
                onClick={handleSave}
                className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-blue-800 text-gray-100 px-4 py-2 bg-gray-100 text-base leading-6 font-medium shadow-sm hover:text-gray-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
              >
                Save
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSupplierModal;

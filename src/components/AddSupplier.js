import React, { useState } from "react";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const AddSupplier = () => {
  const [data, setData] = useState({
    name: "",
    address: "",
    phoneNo: "",
    email: "",
    expectedDelivery: "",
  });

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name, Value", `${name}-${value}`);
    setData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const validateSupplier = (supplier) => {
    const supplierValidationSchema = Joi.object({
      name: Joi.string().required().max(20),
      address: Joi.string().required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org"] },
      }),
      phoneNo: Joi.string().required(),
      expectedDelivery: Joi.number().required(),
    });
    return supplierValidationSchema.validate(supplier, { abortEarly: false });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = validateSupplier(data);
    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrors(errors);
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post("http://localhost:4000/api/suppliers", data);
      console.log("Supplier Added Successfully");
      setSaving(false);
      toast.success("Supplier Added Successfully");
    } catch (e) {
      toast.error("Error Adding Supplier");
      setSaving(false);
    }
  };

  return (
    <form className="sm:max-w-3xl mx-auto px-5 py-16 sm:rounded-lg sm:border mt-8">
      <div className="header"></div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
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
          <span
            className={`text-red-500 ${errors.name ? `visible` : `invisible`}`}
          >
            {errors.name}.
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
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
          <span
            className={`text-red-500 ${
              errors.address ? `visible` : `invisible`
            }`}
          >
            {errors.address}.
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
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
          <span
            className={`text-red-500 ${
              errors.address ? `visible` : `invisible`
            }`}
          >
            {errors.address}.
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
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
          <span
            className={`text-red-500 ${errors.email ? `visible` : `invisible`}`}
          >
            {errors.email}.
          </span>
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
          <span
            className={`text-red-500 ${
              errors.expectedDelivery ? `visible` : `invisible`
            }`}
          >
            {errors.expectedDelivery}.
          </span>
        </div>
      </div>

      <div className="md:flex md:items-center mt-8">
        <div className="md:w-1/3" />
        <div className="md:w-2/3">
          <div className="mx-auto">{saving && <Spinner />}</div>
          <button
            onClick={handleSubmit}
            className="shadow bg-gray-700 hover:bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Add a Supplier
          </button>
        </div>
      </div>
    </form>
  );
};

AddSupplier.propTypes = {};

export default AddSupplier;

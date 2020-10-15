import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner";
import { useRouter } from "next/router";

import Joi from "joi";

import { toast } from "react-toastify";

const CreateUser = (props) => {
  const initialData = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  };
  const [data, setData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "",
  });

  const validateFormData = (data) => {
    const schema = Joi.object({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().min(5).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "org"] },
      }),
      role: Joi.string().required(),
    });
    return schema.validate(data, { abortEarly: false });
  };

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log("Name, Value", `${name}-${value}`);
    setData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSubmit = async (event) => {
    console.log("Form Data-", data);
    console.log("Errors", errors);

    event.preventDefault();
    const { error } = validateFormData(data);

    if (error) {
      const errors = {};
      for (let item of error.details) {
        errors[item.path[0]] = item.message;
      }
      setErrors(errors);
      return;
    }

    setSaving(true);

    try {
      const res = await axios.post("http://localhost:4000/api/users", data);
      console.log("User Created");
      toast.success("User Successfully created");
      setSaving(false);
      setData(initialData);
    } catch (e) {
      console.log("Error", e);
      toast.error("Error Creating User");
      setServerError(e.message);
      console.log("ServerErrorMessage", e.message);
      setSaving(false);
    }
    // console.log("api call response", res.data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="sm:max-w-3xl mx-auto px-5 py-16 sm:rounded-lg sm:border mt-8"
    >
      <div className="header"></div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
          <label
            className="block text-gray-700 font-bold md:text-right mb-5 md:mb-0 pr-4"
            htmlFor="inline-firstName"
          >
            FirstName
          </label>
        </div>
        <div className="md:w-2/3 flex flex-col justify-start">
          <input
            className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
            id="inline-firstName"
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
          />
          <span
            className={`text-red-500 ${
              errors.firstName ? `visible` : `invisible`
            }`}
          >
            {errors.firstName}.
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
          <label
            className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-lastName"
          >
            Last Name
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
            id="inline-lastName"
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
          />
          <span
            className={`text-red-500 ${
              errors.lastName ? `visible` : `invisible`
            }`}
          >
            {errors.lastName}.
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
            className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-password"
          >
            Password
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
            id="inline-password"
            type="password"
            name="password"
            placeholder="******************"
            value={data.password}
            onChange={handleChange}
          />
          <span
            className={`text-red-500 ${
              errors.password ? `visible` : `invisible`
            }`}
          >
            {errors.password}.
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center mb-3">
        <div className="md:w-1/3 -mt-6">
          <label
            className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-role"
          >
            Role
          </label>
        </div>
        <div className="md:w-2/3">
          <div>
            <input
              type="radio"
              class="form-radio"
              name="role"
              value="admin"
              onChange={handleChange}
            />
            <span class="ml-2">Admin</span>

            <input
              type="radio"
              className="form-radio ml-8"
              name="role"
              value="staff"
              selected={true}
              onChange={handleChange}
            />
            <span class="ml-2">Staff</span>
          </div>
          <span
            className={`text-red-500 ${errors.role ? `visible` : `invisible`}`}
          >
            {errors.role}.
          </span>
        </div>
      </div>
      <div className="md:flex md:items-center">
        <div className="md:w-1/3" />
        <div className="md:w-2/3">
          <div className="mx-auto">{saving && <Spinner />}</div>
          <button
            onClick={handleSubmit}
            className="shadow bg-gray-700 hover:bg-red-800 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Create a User
          </button>
        </div>
      </div>
    </form>
  );
};

CreateUser.propTypes = {};

export default CreateUser;

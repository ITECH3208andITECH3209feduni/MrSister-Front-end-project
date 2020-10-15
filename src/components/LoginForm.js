import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Spinner from "./Spinner";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  // localStorage.getItem("mr-sister-login-token") && router.push("/");

  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const res = await axios.post("http://localhost:4000/api/auth", data);
      const token = res.data;
      const user = res.data;
      console.log("Logged In User", user);
      if (user.role === "admin") {
        toast.success("Login Success");
        router.push("/dashboard");
      } else {
        setSaving(false);
        // router.push("/");
      }
    } catch (e) {
      setServerError(e.message);
      toast.error("Login Error!!.");
      setSaving(false);
    }
    // console.log("api call response", res.data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sm:max-w-xl max-w-3xl mx-auto px-10 py-16 sm:rounded-lg sm:border mt-8"
      >
        <div className="header"></div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-700 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-email-name"
            >
              Username
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-red-300"
              id="inline-email-name"
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
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
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

LoginForm.propTypes = {};

export default LoginForm;

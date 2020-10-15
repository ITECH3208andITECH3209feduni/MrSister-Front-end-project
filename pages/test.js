import React, { useEffect } from "react";
import PropTypes from "prop-types";
import LoginForm from "../src/components/LoginForm";
import axios from "axios";

const LoginPage = (props) => {
  useEffect(() => {
    const res = axios.post("localhost:4000/api/users/");
    console.log(res.status);
  });
  return (
    <>
      <h1 className="mx-auto text-center mt-20 font-bold text-4xl text-blue-700">
        Mr. Sister App
      </h1>
      <h2 className="mx-auto text-center mt-5 font-bold">
        Login to access the system
      </h2>
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;

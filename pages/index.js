import React from "react";
import PropTypes from "prop-types";
import LoginForm from "../src/components/LoginForm";

const LoginPage = (props) => {
  return (
    <>
      <h1 className="mx-auto text-center mt-20 font-bold text-4xl text-blue-700">
        Mr. Sister App
      </h1>
      <h2 className="mx-auto text-center mt-5 font-bold">
        Login to access the system
      </h2>

      <LoginForm />
    </>
  );
};

LoginPage.propTypes = {};

export default LoginPage;

import "antd/dist/antd.css";
import "../styles/styles.css";
import "react-toastify/dist/ReactToastify.css";

import React from "react";
import PropTypes from "prop-types";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default App;

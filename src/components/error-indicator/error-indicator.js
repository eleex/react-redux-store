import React from "react";
import "./error-indicator.css";

const ErrorIndicator = ({error = "Error Indicator"}) => {
  return <div>{error}</div>;
};

export default ErrorIndicator;

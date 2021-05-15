import React from "react";
import lImg from "./inv.png";

const Logo = (props) => {
  return (
    <img
      style={{ width: "60px", height: "50px" }}
      alt="Logo"
      src={lImg}
      // src="/static/logo.svg"
      {...props}
    />
  );
};

export default Logo;

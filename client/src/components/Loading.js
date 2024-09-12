import React from "react";
import { ColorRing } from "react-loader-spinner";
const Loading = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass="color-ring-wrapper"
      colors={["#e0e0e0", "#f0f0f0", "#d0d0d0", "#c0c0c0", "#b0b0b0"]}
    />
  );
};

export default Loading;

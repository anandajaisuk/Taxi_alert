import React from "react";
import Loginform from "../components/Loginform";
import Topnavbar from "../components/Topnavbar";

const page = () => {
  return (
    <div>
      <Topnavbar></Topnavbar>
      <Loginform />
    </div>
  );
};

export default page;

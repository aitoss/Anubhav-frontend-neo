import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const TermsService = () => {
  return (
    <>
      <Navbar />
      <div className="w-[100%] h-[100vh] flex flex-col justify-center place-items-center">
        <div className="h-[10vh]"></div>
        <h1 className="text-black">Terms of Service</h1>
      </div>
    </>
  );
};

export default TermsService;

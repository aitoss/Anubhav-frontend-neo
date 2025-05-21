import React from "react";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Videos from "../Videos/page";

const VideosPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar className="sticky top-0 z-50 bg-white" />
      <div className="flex-grow">
        <Videos />
      </div>
      <Footer />
    </div>
  );
};

export default VideosPage;

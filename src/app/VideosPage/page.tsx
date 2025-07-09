import React from "react";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import Videos from "../videos/page";

const VideosPage = () => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex-grow">
        <Videos />
      </div>
      <Footer />
    </div>
  );
};

export default VideosPage;

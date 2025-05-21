"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // <-- Add BrowserRouter
import AnubhavIsOS from "./components/Landing/AnubhavIsOS/AnubhavIsOS";
import CTA from "./components/Landing/CTA/CTA";
import Features from "./components/Landing/Features/Features";
import Footer from "./components/Landing/Footer/Footer";
import HomeScreen from "./components/Landing/HomeScreen/HomeScreen";
import HowItWorks from "./components/Landing/HowItWorks/HowItWorks";
import WhatIsAnubhav from "./components/Landing/WhatIsAnubhav/WhatIsAnubhav";
import Navbar from "./components/Navbar/Navbar";
import SearchPage from "./components/Search/SearchPage";
import Create from "./app/Create/page";
import DevTeam from "./app/DevTeam/page";
import Error404 from "./app/Error404/page";
import Guidelines from "./app/Guidelines/page";
import RequestArticle from "./app/RequestArticle/page";
import Stories from "./app/Stories/page";
import Story from "./app/Story/page";
import TermsService from "./app/TermsService/page";
import VideosPage from "./app/VideosPage/page";
import ViewBlog from "./app/ViewBlog/page";
import YouTubePlaylist from "./app/YoutubePlaylist/page";

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="mx-auto flex flex-col overflow-hidden">
              <Navbar />
              <HomeScreen />
              <WhatIsAnubhav />
              <HowItWorks />
              <Features />
              <AnubhavIsOS />
              <div className="flex flex-col items-center">
                <CTA />
                <Footer />
              </div>
            </div>
          }
        />
        <Route path="/Create" element={<Create />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route path="/request" element={<RequestArticle />} />
        <Route path="/legal/terms/" element={<TermsService />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/team" element={<DevTeam />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/test" element={<YouTubePlaylist />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

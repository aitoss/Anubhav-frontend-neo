"use client";
import Lenis from "lenis";
import { useEffect } from "react";
import AnubhavIsOS from "../components/Landing/AnubhavIsOS/AnubhavIsOS";
import CTA from "../components/Landing/CTA/CTA";
import Features from "../components/Landing/Features/Features";
import HomeScreen from "../components/Landing/HomeScreen/HomeScreen";
import HowItWorks from "../components/Landing/HowItWorks/HowItWorks";
import WhatIsAnubhav from "../components/Landing/WhatIsAnubhav/WhatIsAnubhav";

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="mx-auto flex flex-col overflow-hidden">
      <HomeScreen />
      <WhatIsAnubhav />
      <HowItWorks />
      <Features />
      <AnubhavIsOS />
      <div className="flex flex-col items-center">
        <CTA />
      </div>
    </div>
    // <BrowserRouter>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //       }
    //     />
    //     <Route path="/Create" element={<Create />} />
    //     <Route path="/blog/:id" element={<ViewBlog />} />
    //     <Route path="/guidelines" element={<Guidelines />} />
    //     <Route path="/request" element={<RequestArticle />} />
    //     <Route path="/legal/terms/" element={<TermsService />} />
    //     <Route path="/videos" element={<VideosPage />} />
    //     <Route path="/search" element={<SearchPage />} />
    //     <Route path="/story" element={<Story />} />
    //     <Route path="/team" element={<DevTeam />} />
    //     <Route path="/stories" element={<Stories />} />
    //     <Route path="/test" element={<YouTubePlaylist />} />
    //     {/* <Route path="*" element={<Error404 />} /> */}
    //   </Routes>
    // </BrowserRouter>
  );
};
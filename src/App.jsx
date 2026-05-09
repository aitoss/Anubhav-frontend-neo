import Lenis from "lenis";
import { useEffect } from "react";
import { Route, Routes, useLocation, matchPath, Navigate } from "react-router-dom";
import AnubhavIsOS from "./components/Landing/AnubhavIsOS/AnubhavIsOS";
import CTA from "./components/Landing/CTA/CTA";
import Features from "./components/Landing/Features/Features";
import Footer from "./components/Landing/Footer/Footer";
import HomeScreen from "./components/Landing/HomeScreen/HomeScreen";
import HowItWorks from "./components/Landing/HowItWorks/HowItWorks";
import WhatIsAnubhav from "./components/Landing/WhatIsAnubhav/WhatIsAnubhav";
import Navbar from "./components/Navbar/Navbar";
import SearchPage from "./components/Search/SearchPage";
import Create from "./pages/Create";
import EditArticle from "./pages/EditArticle";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";
import DevTeam from "./pages/DevTeam";
import Error404 from "./pages/Error404";
import Guidelines from "./pages/Guidelines";
import RequestArticle from "./pages/RequestArticle";
import Stories from "./pages/Stories";
import Story from "./pages/Story";
import TermsService from "./pages/TermsService";
import VideosPage from "./pages/VideosPage";
import ViewBlog from "./pages/ViewBlog";
import YouTubePlaylist from "./pages/YouTubePlaylist";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import { SessionAuth } from "supertokens-auth-react/recipe/session";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import * as reactRouterDom from "react-router-dom";
import { UserProvider } from "./context/UserContext";

const AuthRouteShell = () => {
  const location = useLocation();
  const onAuth = matchPath("/auth/*", location.pathname);
  if (!onAuth) return null;
  return (
    <>
      <Navbar />
      {/* Spacer for fixed Navbar so SuperTokens prebuilt UI doesn't sit underneath it */}
      <div className="h-[80px]" />
    </>
  );
};

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <UserProvider>
      <AuthRouteShell />
      <Routes>
        {getSuperTokensRoutesForReactRouterDom(reactRouterDom, [
          EmailPasswordPreBuiltUI,
        ])}
        <Route
          path="/"
          element={
            <>
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
            </>
          }
        />
        <Route
          path="/create"
          element={
            <SessionAuth>
              <Create />
            </SessionAuth>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <SessionAuth>
              <EditArticle />
            </SessionAuth>
          }
        />
        <Route path="/my-posts" element={<Navigate to="/profile/me" replace />} />
        <Route path="/profile" element={<Navigate to="/profile/me" replace />} />
        <Route
          path="/profile/edit"
          element={
            <SessionAuth>
              <Profile />
            </SessionAuth>
          }
        />
        <Route path="/profile/me" element={<PublicProfile />} />
        <Route path="/profile/:userId" element={<PublicProfile />} />
        <Route path="/u/:userId" element={<PublicProfile />} />
        <Route path="/u/:userId/:slug" element={<PublicProfile />} />
        <Route path="/blog/:id" element={<ViewBlog />} />
        <Route path="/guidelines" element={<Guidelines />} />
        <Route
          path="/request"
          element={
            <SessionAuth>
              <RequestArticle />
            </SessionAuth>
          }
        />
        <Route path="/legal/terms/" element={<TermsService />} />
        <Route path="/videos" element={<VideosPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/story" element={<Story />} />
        <Route path="/team" element={<DevTeam />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/test" element={<YouTubePlaylist />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </UserProvider>
  );
};

export default App;

import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { Cross as Hamburger } from "hamburger-react";
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import logo from "../../assets/images/logo.svg";
import MobileNav from "./MobileNav";
import "./Navbar.css";
import ButtonV5 from "../ui/buttonv5";
import SVGStore from "../SVGs/SVGStore";
import LogoutButton from "../ui/LogoutButton";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // for hamburger menu
  const [MobileNavOpen, setMobileNavOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleClick = () => {
    setMobileNavOpen(!MobileNavOpen);
    setIsOpen(!isOpen);
  };

  const scrollToBlog = () => {
    const blogSection = document.getElementById("blog-section");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "mdooth" });
    }
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const scrollingDown = currentScrollPos > prevScrollPos;

    setVisible(!scrollingDown);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const navClasses = `bg-[#ffffffcc] bg-blur border-b fixed item-center justify-center h-[60px] p-3 flex w-screen text-[#212121] z-[9999] transition-transform transform ${
    visible ? "translate-y-0" : "-translate-y-full"
  }`;

  return (
    <>
      <nav className={navClasses} aria-label="Global">
        <div className="m-auto flex h-full w-full max-w-[1400px] items-center justify-between">
          <div className="flex w-full items-center justify-between px-1 lg:px-8">
            <div className="flex items-center justify-center gap-12">
              <Link to="/" className="flex items-center justify-center gap-1">
                <img className="w-10" src={logo} alt="" />
                <h4 className="text-3xl font-[600] tracking-tighter">
                  anubhav
                </h4>
              </Link>
              <div
                to="/"
                className="flex items-center justify-center gap-1 md:hidden"
              >
                <NavLink to="/videos">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    Videos
                  </div>
                </NavLink>
                <NavLink to="/team">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    Team
                  </div>
                </NavLink>
                <NavLink to="/story">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    About
                  </div>
                </NavLink>
                <NavLink to="https://github.com/aitoss/Anubhav-frontend-23" target="_blank">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    GitHub
                  </div>
                </NavLink>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <NavLink to="/request">
                <ButtonV5 icon={false} color="#f8f8f8">
                  <h5 className="flex gap-1 text-[16px] font-[400] -tracking-[0.2px] text-[#212121]">
                    Request <div className="block x-sm:hidden">Article</div>
                  </h5>
                </ButtonV5>
              </NavLink>
              <Link
                to="/create"
                className="cursor-pointer hover:text-[#313131]"
              >
                <ButtonV5 icon={false}>
                  <div className="flex items-center justify-center gap-1">
                    <h5 className="flex gap-1 font-[400] -tracking-[0.2px]">
                      Write<div className="block x-sm:hidden">Article</div>
                    </h5>
                    <SVGStore name="write-article" className="flex w-5 items-center justify-end overflow-hidden" />
                  </div>
                </ButtonV5>
              </Link>
            </div>
          </div>
          <LogoutButton />
        </div>
      </nav>
    </>
  );
};

export default Navbar;

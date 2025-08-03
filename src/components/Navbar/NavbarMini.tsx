// import { Cross as Hamburger } from "hamburger-react";
import { Pen, SearchIcon } from "lucide-react";
import Link from "next/link";
import logo from "public/assets/images/logo.svg";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Search from "../Search/Search";
import SearchModal from "../Search/SearchModal";
import { Button } from "../ui/button";
import { AnubhavIcon } from "../ui/icon";
import { LinkButton } from "../ui/link-button";
import "./Navbar.css";

const NavbarMini = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false); // for hamburger menu
  const [MobileNavOpen, setMobileNavOpen] = useState<boolean>(false); // for mobile nav
  const [prevScrollPos, setPrevScrollPos] = useState<number>(0); // for navbar hide on scroll
  const [visible, setVisible] = useState<boolean>(true); // for navbar hide on scroll
  const [searchMobile, setSearchMobile] = useState<boolean>(false); // for search modal

  const closeSearchModal = () => {
    setSearchMobile(false);
  };

  const handleClick = () => {
    setMobileNavOpen(!MobileNavOpen);
    setIsOpen(!isOpen);
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const scrollingDown = currentScrollPos > prevScrollPos;

    setVisible(!scrollingDown);
    setPrevScrollPos(currentScrollPos);
  };

  const openSearchMobile = () => {
    setSearchMobile(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  const navClasses = `relative bg-[#ffffffcc] bg-blur border-b fixed items-center justify-center h-[60px] p-3 flex w-screen text-black z-50 transition-transform transform ${visible ? "translate-y-0" : "-translate-y-full"
    }`;

  return (
    <>
      {/* <div className="flex flex-col"> */}
      {searchMobile && (
        <SearchModal closeSearchModal={closeSearchModal} focus={1} full={1} />
      )}
      <nav className={navClasses} aria-label="Global">
        <div className="m-auto flex h-full w-full max-w-7xl items-center justify-between">
          <div className="flex w-full items-center justify-between px-1 lg:px-8">
            <div className="flex items-center justify-center gap-2">
              <Link href="/" className="">
                <AnubhavIcon width="30" height="28" />
              </Link>
              <div className="md:block hidden">
                <Search mode="light" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Button
                variant="outline"
                className="md:hidden size-9 p-2"
                onClick={() => { openSearchMobile(); }}
                asChild
              >
                <SearchIcon />
              </Button>
              <div className="flex items-center gap-2">
                <LinkButton href="/request" variant="outline">
                  Request Article
                </LinkButton>
                <LinkButton href="/create" variant="default" icon={<Pen />}>
                  Write Article
                </LinkButton>
              </div>
            </div>
          </div>
        </div>
        <div>{/* {click && content} */}</div>
        <div className="hidden w-full items-center justify-between px-0">
          <Link href="/" className="p-2">
            <img className="w-10" src={logo} alt="" />
          </Link>
          <div className="flex items-center justify-center gap-2">
            <div
              onClick={() => {
                openSearchMobile();
              }}
              className="flex h-[28px] w-[28px] cursor-pointer items-center justify-center rounded-lg border-[1.5px] border-[#d9d9d9] bg-[#f8f8f8] p-1"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 33 33"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8333 28.6509C22.8289 28.6509 28.5 22.9798 28.5 15.9842C28.5 8.9886 22.8289 3.31754 15.8333 3.31754C8.83769 3.31754 3.16663 8.9886 3.16663 15.9842C3.16663 22.9798 8.83769 28.6509 15.8333 28.6509Z"
                  stroke="#b9b9b9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M29.8333 29.9842L27.1666 27.3175"
                  stroke="#b9b9b9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className="z-50 m-0 hidden items-center justify-center p-0 text-white transition-all md:flex"
              onClick={handleClick}
            >
              {/* {click ? <FaTimes /> : <CiMenuFries />} */}
              <RxHamburgerMenu
                direction="right"
                color="#212121"
                size={32}
              />
            </div>
          </div>
        </div>
      </nav >
      {/* {MobileNavOpen && <MobileNav isOpen={isOpen} />} */}
      {/* </div> */}
    </>
  );
};

export default NavbarMini;

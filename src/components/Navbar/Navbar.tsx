import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "../../app/assets/images/logo.svg";
import ButtonV5 from "../ui/buttonv5";
import "./Navbar.css";

const Navbar = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

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

  const navClasses = `bg-[#ffffffcc] bg-blur border-b fixed item-center justify-center h-[60px] p-3 flex w-screen text-[#212121] z-[9999] transition-transform transform ${visible ? "translate-y-0" : "-translate-y-full"
    }`;

  return (
    <>
      {/* <div className="flex flex-col"> */}

      <nav className={navClasses} aria-label="Global">
        <div className="m-auto flex h-full w-full max-w-[1400px] items-center justify-between">
          <div className="flex w-full items-center justify-between px-1 lg:px-8">
            <div className="flex items-center justify-center gap-12">
              <Link href="/" className="flex items-center justify-center gap-1">
                <img className="w-10" src={logo.src} alt="" />
                <h4 className="text-3xl font-[600] tracking-tighter">
                  anubhav
                </h4>
              </Link>
              <div className="flex items-center justify-center gap-1 md:hidden">
                <Link href="/videos">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    Videos
                  </div>
                </Link>
                <Link href="/team">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    Team
                  </div>
                </Link>
                <Link href="/story">
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    About
                  </div>
                </Link>
                <Link
                  href="https://github.com/aitoss/Anubhav-frontend-23"
                  target="_blank"
                >
                  <div className="flex rounded-lg px-2 py-0 text-base font-[500] text-[#212121] transition-all hover:bg-[#efefef] hover:py-1">
                    GitHub
                  </div>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link href="/request">
                <ButtonV5
                  title="Request Article"
                  icon={false}
                  color="#f8f8f8"
                  textColor="#212121"
                  disabled={false}
                  borderRadius="8px"
                >
                  <h5 className="flex gap-1 text-[16px] font-[400] -tracking-[0.2px] text-[#212121]">
                    Request <span className="block x-sm:hidden">Article</span>
                  </h5>
                </ButtonV5>
              </Link>
              <Link
                href="/create"
                className="cursor-pointer hover:text-[#313131]"
              >
                {/* <div className="flex gap-2 p-1 justify-center items-center text-[16px] bg-[#212121] border border-[#121212] rounded-lg text-[#fff] font-[300] cursor-pointer hover:bg-[#313131] hover:focus:outline:none hover:focus:border:none transition-all"> */}
                <ButtonV5
                  title="Write Article"
                  icon={false}
                  color="#212121"
                  textColor="#fff"
                  disabled={false}
                  borderRadius="8px"
                >
                  <div className="flex items-center justify-center gap-1">
                    <h5 className="flex gap-1 font-[400] -tracking-[0.2px]">
                      Write<div className="block x-sm:hidden">Article</div>
                    </h5>
                    {/* write svg */}
                    <div className="flex w-5 items-center justify-end overflow-hidden">
                      <div className="w-5">
                        <svg
                          className={`translate-x-[0%] text-[#ffffff80] opacity-0 transition-all duration-0 group-hover:translate-x-[100%] group-hover:text-[#ffffff] group-hover:opacity-100 group-hover:duration-300`}
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                            stroke="#f0f0f0"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
                            stroke="#f0f0f0"
                            strokeWidth="1.2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.9099 4.15002C15.5799 6.54002 17.4499 8.41002 19.8499 9.09002"
                            stroke="#f0f0f0"
                            strokeWidth="1.2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="w-5">
                        <svg
                          className={`translate-x-[0%] text-[#ffffff80] opacity-100 transition-all duration-0 group-hover:translate-x-[100%] group-hover:text-[#ffffff] group-hover:opacity-0 group-hover:duration-300`}
                          width="19"
                          height="19"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                            stroke="#f0f0f0"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16.0399 3.02001L8.15988 10.9C7.85988 11.2 7.55988 11.79 7.49988 12.22L7.06988 15.23C6.90988 16.32 7.67988 17.08 8.76988 16.93L11.7799 16.5C12.1999 16.44 12.7899 16.14 13.0999 15.84L20.9799 7.96001C22.3399 6.60001 22.9799 5.02001 20.9799 3.02001C18.9799 1.02001 17.3999 1.66001 16.0399 3.02001Z"
                            stroke="#f0f0f0"
                            strokeWidth="1.2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14.9099 4.15002C15.5799 6.54002 17.4499 8.41002 19.8499 9.09002"
                            stroke="#f0f0f0"
                            strokeWidth="1.2"
                            strokeMiterlimit="10"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </ButtonV5>

                {/* </div> */}
              </Link>
            </div>
          </div>
        </div>
        <div>{/* {click && content} */}</div>
        {/* <div className="hidden md:flex w-full items-center justify-between px-0">
                    <Link to="/" className="p-2">
                        <img className="w-10" src={logo} alt="" />
                    </Link>
                    <div className="items-center justify-center p-0 m-0 z-50 md:flex hidden text-white transition-all" onClick={handleClick}>
                        <Hamburger direction="right" color="#212121" size={32} toggled={isOpen} toggle={setIsOpen} />
                    </div>
                </div> */}
      </nav>
      {/* {MobileNavOpen && <MobileNav isOpen={isOpen} />} */}
      {/* </div> */}
    </>
  );
};

export default Navbar;

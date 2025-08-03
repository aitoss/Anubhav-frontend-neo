import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

const MobileNav = ({ isOpen }: any) => {
  // const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log(isOpen);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, []);

  return (
    <>
      <div
        className={`bg-blur fixed top-[70px] z-[9999] w-full bg-[#ffffffbb] shadow-lg shadow-[rgba(0,0,0,0.07)]`}
      >
        <div className="flex flex-col justify-center gap-2 border-b">
          <NavLink className="cursor-pointer px-3" to="/request">
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ duration: 0.1, delay: 0.07 }}
            >
              <h5 className="flex items-center justify-center gap-2 rounded-lg p-1 text-[16px] font-[400] -tracking-[0.2px] hover:bg-[#00000015]">
                Request Article
              </h5>
            </motion.div>
          </NavLink>
          <Link to="/create" className="cursor-pointer px-3">
            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0, translateY: -10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -10 }}
              transition={{ duration: 0.1, delay: 0.09 }}
            >
              <div className="hover:focus:outline:none hover:focus:border:none flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-[#121212] bg-[#212121] p-1 text-[16px] font-[300] text-[#fff] transition-all hover:bg-[#313131]">
                <h5 className="font-[300] -tracking-[0.2px]">Write Article</h5>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 2H8C4 2 2 4 2 8V21C2 21.55 2.45 22 3 22H16C20 22 22 20 22 16V8C22 4 20 2 16 2Z"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.91 7.84L7.72004 13.03C7.52004 13.23 7.33004 13.62 7.29004 13.9L7.01004 15.88C6.91004 16.6 7.41004 17.1 8.13004 17L10.11 16.72C10.39 16.68 10.78 16.49 10.98 16.29L16.17 11.1C17.06 10.21 17.49 9.17 16.17 7.85C14.85 6.52 13.81 6.94 12.91 7.84Z"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.1699 8.58C12.6099 10.15 13.8399 11.39 15.4199 11.83"
                    stroke="#f0f0f0"
                    strokeWidth="1"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
      {/* </motion.div> */}
    </>
  );
};

export default MobileNav;

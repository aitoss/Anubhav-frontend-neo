import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import error from "../assets/images/404Illustration.png";
import Logo from "../../components/Loader/DummyLoader";
import ButtonV5 from "../../components/ui/buttonv5";

export default function Error404() {
  return (
    <>
      <Navbar />
      {/* <div className="h-16 w-screen md:h-12 pt-12"></div> */}
      <section className="mx-auto flex h-[90vh] w-[100%] flex-col place-items-center justify-center md:justify-center">
        <div className="flex flex-col place-items-center justify-center gap-2 md:bottom-20">
          <motion.div
            initial={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 50 }}
            exit={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.15, delay: 0.02 }}
          >
            <h1 className="text-[#212121] md:text-[44px] x-sm:text-[36px]">
              Page not found
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 50 }}
            exit={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.15, delay: 0.04 }}
            className="no-scrollbar flex h-[390px] items-center justify-center overflow-auto"
          >
            <img
              className="pointer-events-none -mt-12 w-[500px] select-none md:w-[400px]"
              draggable="false"
              src={error.src}
              alt=""
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 50 }}
            exit={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.15, delay: 0.06 }}
          >
            <p className="-mt-12 text-center text-[#212121] md:text-[15px]">
              Oops! Looks like you followed a bad link. If you think is a
              problem with us, please tell us
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 50 }}
            exit={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.15, delay: 0.08 }}
          >
            <Link to="/">
              <ButtonV5 textColor="#212121" color="#f8f8f8">
                <h5 className="flex gap-1 text-[16px] font-[400] -tracking-[0.2px] text-[#212121]">
                  Home
                </h5>
              </ButtonV5>
            </Link>
          </motion.div>
        </div>
      </section>
      {/* <div className="w-full flex justify-center h-screen items-center"><Logo /></div> */}
    </>
  );
}

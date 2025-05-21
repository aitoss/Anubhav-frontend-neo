import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import error from "../assets/images/404Illustration.png";
import Logo from "../components/Loader/DummyLoader";
import ButtonV5 from "../../components/ui/buttonv5";

export default function Error404() {
  return (
    <>
      <Navbar />
      {/* <div className="h-16 w-screen md:h-12 pt-12"></div> */}
      <section className="w-[100%] h-[90vh] mx-auto flex flex-col justify-center place-items-center md:justify-center ">
        <div className="flex flex-col justify-center place-items-center gap-2 md:bottom-20">
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
            className="h-[390px] no-scrollbar overflow-auto flex justify-center items-center"
          >
            <img
              className="w-[500px] pointer-events-none md:w-[400px] select-none -mt-12"
              draggable="false"
              src={error}
              alt=""
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, translateY: 60 }}
            animate={{ opacity: 1, translateY: 50 }}
            exit={{ opacity: 0, translateY: 100 }}
            transition={{ duration: 0.15, delay: 0.06 }}
          >
            <p className="text-[#212121] text-center md:text-[15px] -mt-12">
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
            <Link
              to="/"
            >
              <ButtonV5 textColor='#212121' color="#f8f8f8">
                <h5 className="flex gap-1 font-[400] text-[#212121] text-[16px] -tracking-[0.2px]">
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

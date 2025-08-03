import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnubhaverIcon from "../assets/AnubhavIcon.tsx";
import Confetti from "react-confetti";
import { motion } from "motion/react";

const SubmittedCard = () => {
  const navigate = useNavigate();
  const [isConfettiActive, setIsConfettiActive] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(5);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timerInterval = setInterval(() => {
      setTimer((prev: number) => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5000);

    const confettiTimer = setTimeout(() => {
      setIsConfettiActive(false);
      navigate("/");
    }, 5500);

    return () => {
      clearInterval(timerInterval);
      clearTimeout(fadeOutTimer);
      clearTimeout(confettiTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50">
      {isConfettiActive && (
        <Confetti
          className={`transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        />
      )}
      <motion.div
        className="m-4 w-[400px] rounded-2xl border-2 bg-white p-4 shadow-lg"
        initial={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, translateY: 10 }}
        transition={{ duration: 0.15 }}
      >
        <AnubhaverIcon className="-mt-12 w-24" />
        <h1 className="text-3xl font-[600]">Congratulations!!</h1>
        <p className="font-[500] text-[#212121]/90">
          Your article has been successfully published!
        </p>
        <p className="font-[500] text-[#212121]/90">
          Sit back while we approve your article and make it live.
        </p>
        <p className="mt-4 font-[500] text-[#212121]/90">
          Redirecting to home in {timer} seconds...
        </p>
      </motion.div>
    </div>
  );
};

export default SubmittedCard;

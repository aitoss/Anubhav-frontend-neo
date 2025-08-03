import React from "react";
import { motion } from "framer-motion";
import Footer from "../../components/Landing/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const Guidelines = () => {
  return (
    <>
      <Navbar />
      <div className="h-16 md:h-8"></div>
      <div className="flex flex-col items-center min-h-full">
        <section className="mx-auto w-[100%] h-full max-w-[1400px] lg:w-[70%] px-4 py-8 overflow-y-auto">
          <div className="text-xl text-black">
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.15, delay: 0.05 }}
            >
              <h1 className="text-4xl lg:py-8 font-semibold text-center text-black">
                Guidelines
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.15, delay: 0.07 }}
            >
              <p>
                Anubhav, the experience sharing platform, welcomes contributions
                from anyone at AIT to support others on their journey to the
                next interview. It offers a wealth of articles and resources
                specifically tailored to college placements and interview
                experiences.
              </p>
            </motion.div>
            <br />
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.15, delay: 0.1 }}
            >
              <h2 className="text-black text-2xl lg:pb-4 font-semibold">
                Reviewing Process:
              </h2>
            </motion.div>
            <ul>
              <motion.div
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 100 }}
                transition={{ duration: 0.15, delay: 0.12 }}
              >
                <li>
                  Step 1: Share your interview experience in the write-article
                  section.
                </li>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 100 }}
                transition={{ duration: 0.15, delay: 0.14 }}
              >
                <li>
                  Step 2: Submit your article. After submission, it will go for
                  verification. Verification is just a small process to filter
                  out spam articles.
                </li>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 100 }}
                transition={{ duration: 0.15, delay: 0.14 }}
              >
                <li>
                  Step 3: After verification, it will be available on our
                  platform.
                </li>
              </motion.div>
            </ul>
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.15, delay: 0.17 }}
            >
              <h2 className="text-black text-2xl lg:pt-8 lg:pb-4 font-semibold">
                How to write Article:
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, translateY: 10 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: 100 }}
              transition={{ duration: 0.15, delay: 0.2 }}
            >
              <p className="py-2">
                We&apos;ve created a user-friendly and straightforward article
                writing section. To ensure a clear understanding of how to use
                it, please refer to the following points:
              </p>
            </motion.div>
            <div className="lg:ml-8 p-3 lg:p-0">
              <ul className="list-decimal">
                <motion.div
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 100 }}
                  transition={{ duration: 0.15, delay: 0.22 }}
                >
                  <li>
                    Enter basic information like your name, company name,
                    offered position, and email address.
                  </li>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 100 }}
                  transition={{ duration: 0.15, delay: 0.24 }}
                >
                  <li>
                    Write the article in the editor which offers a variety of
                    features to streamline the article writing process,
                    including the ability to add headings, code blocks, format
                    text, insert emojis, images, and more.
                  </li>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 100 }}
                  transition={{ duration: 0.15, delay: 0.26 }}
                >
                  <li>Add relevant tags related to your company and field.</li>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, translateY: 10 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  exit={{ opacity: 0, translateY: 100 }}
                  transition={{ duration: 0.15, delay: 0.28 }}
                >
                  <li>
                    Click the submit button to send your article for spam check
                    (verification step).
                  </li>
                </motion.div>
              </ul>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Guidelines;

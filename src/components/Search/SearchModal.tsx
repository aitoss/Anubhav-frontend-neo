import { motion } from "framer-motion";
import Search from "./Search";

const SearchModal = ({
  closeSearchModal,
  focus,
  full
}: any) => {
  const handleClose = (e: any) => {
    if (e.target.classList.contains("fixed")) {
      closeSearchModal();
    }
  };

  return (
    <>
      {/* search field */}
      <div
        onClick={(e: any) => {
          handleClose(e);
        }}
        className="fixed inset-0 -top-[480px] z-[99999999999] flex items-center justify-center bg-white/70"
      >
        <motion.div
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0, translateY: 20 }}
          transition={{ duration: 0.1 }}
        >
          <Search mode="dark" focus={focus} full={full} />
        </motion.div>
      </div>
    </>
  );
};

export default SearchModal;

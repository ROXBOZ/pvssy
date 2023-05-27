import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const motionVariants = {
  hidden: {
    x: 0,
  },

  visible: {
    x: 10,
    transition: {
      type: "spring",
      stiffness: 200,
    },
  },
};

export const TitleLink = ({ to, title }) => (
  <Link className="title-link" to={to}>
    <motion.h3 variants={motionVariants} initial="hidden" whileHover="visible">
      {title}
    </motion.h3>
  </Link>
);

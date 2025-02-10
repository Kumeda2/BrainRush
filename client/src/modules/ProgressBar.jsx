import { motion } from "framer-motion";

export default function ProgressBar({ duration }) {
  return (
    <div className="progress-bar-container">
      <motion.div
        className="progress-bar"
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration }}
      />
    </div>
  );
}

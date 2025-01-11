import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Card({ title, img, click }) {
  const [showTitle, setShowTitle] = useState(false);

  return (
    <motion.div
      className="card"
      onHoverStart={() => setShowTitle(true)}
      onHoverEnd={() => setShowTitle(false)}
      onClick={() => click()}
    >
      <AnimatePresence>
        {showTitle && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="background" />
            <motion.h3
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
              className="title"
            >
              {title}
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
      <img src={img} style={{ borderRadius: "10px" }} />
    </motion.div>
  );
}

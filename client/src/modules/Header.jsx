import { IoMenu } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import { paths } from "../router/paths";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "../UI/Button/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/middlewareActions";

export default function Header({ links, isLogOut, isMobile }) {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate(paths.ENTRY);
  };

  return (
    <header className="header">
      <IoMenu
        onClick={() => setShowMenu((prev) => !prev)}
        size={"25px"}
        cursor={"pointer"}
      />
      <AnimatePresence>
        {showMenu && (
          <motion.div
            className="menu-nav"
            initial={isMobile ? { y: 50, opacity: 0 } : { x: 20, opacity: 0 }}
            animate={isMobile ? { y: 80, opacity: 1 } : { x: 50, opacity: 1 }}
            exit={isMobile ? { y: 55, opacity: 0 } : { x: 25, opacity: 0 }}
          >
            {links.map((link) => {
              return (
                <Link
                  to={
                    link === "Main"
                      ? paths.MAIN
                      : link === "Create game"
                      ? paths.GAMES_CREATION
                      : paths.MY_GAMES
                  }
                  className="link"
                  key={link}
                >
                  {link}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container">
        {isLogOut && (
          <Button
            variant={"classic2"}
            size={{ width: "50%", height: "100%" }}
            clickHandler={logoutHandler}
          >
            Log out
          </Button>
        )}
        <h3>BrainRush</h3>
      </div>
    </header>
  );
}

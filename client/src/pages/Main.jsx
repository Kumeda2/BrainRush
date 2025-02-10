import Games from "../components/Games";
import Sidebar from "../modules/Sidebar";
import GameInfo from "../components/GameInfo";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPopularGames } from "../store/actions/asyncGamesActions";
import Header from "../modules/Header";
import useResizeDetector from "../hooks/useResizeDetector";
import { resetPopularGames } from "../store/slices/gamesSlice";

export default function Main() {
  const dispatch = useDispatch();
  const { popularGames } = useSelector((state) => state.games);
  const { user } = useSelector((state) => state.user);
  const { isMobile, width } = useResizeDetector();

  useEffect(() => {
    dispatch(resetPopularGames());
  }, []);

  useEffect(() => {
    if (popularGames.length === 0) dispatch(getPopularGames(user.username));
  }, [popularGames]);

  return (
    <div className="main">
      <Header
        links={["My Games", "Create game", "Log out"]}
        isLogOut={true}
        isMobile={isMobile}
      />
      <Sidebar />
      <div className="wrapper">
        <GameInfo isMobile={isMobile} width={width} />
        <Games />
      </div>
    </div>
  );
}

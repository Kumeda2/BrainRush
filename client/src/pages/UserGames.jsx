import UserGamesSection from "../components/UserGamesSection";
import Header from "../modules/Header";

export default function UserGames() {
  return (
    <>
      <Header links={["Main", "Create game"]} isMobile={false} />
      <UserGamesSection />
    </>
  );
}

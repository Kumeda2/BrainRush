import GameCreating from "../components/GameCreating";
import useResizeDetector from "../hooks/useResizeDetector";
import Header from "../modules/Header";

export default function CreatingPage() {
  const { isMobile } = useResizeDetector();

  return (
    <>
      <Header links={["Main", "My Games"]} isMobile={isMobile} />
      <GameCreating />
    </>
  );
}

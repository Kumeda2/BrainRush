import { useSelector } from "react-redux";
import Header from "../modules/Header";
import Results from "../components/Results";
import useResizeDetector from "../hooks/useResizeDetector";

export default function ResultsPage() {
  const { isAuth } = useSelector((state) => state.user);
  const { isMobile } = useResizeDetector();

  return (
    <>
      {isAuth && (
        <Header
          links={["Main", "My Games", "Create game"]}
          isMobile={isMobile}
        />
      )}
      <Results />
    </>
  );
}

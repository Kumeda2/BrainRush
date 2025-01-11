import game from "../assets/images/game.webp";
import Card from "../modules/Card";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useRef, useEffect, useState } from "react";
import { displayGame } from "../store/store";
import { useDispatch } from "react-redux";

export default function Gallery() {
  const dispatch = useDispatch();

  const games = [
    {
      title: "Game 1",
      preview: "src/assets/images/game.webp",
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 2",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 3",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 4",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 5",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 6",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 7",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
    {
      title: "Game 8",
      preview: game,
      questions: [
        {
          question: "How many chromosomes does human have?",
          answers: [
            { text: "45", isCorrect: false },
            { text: "46", isCorrect: true },
            { text: "47", isCorrect: false },
            { text: "48", isCorrect: false },
          ],
        },
        {
          question: "What is the capital of France?",
          answers: [
            { text: "Berlin", isCorrect: false },
            { text: "Madrid", isCorrect: false },
            { text: "Paris", isCorrect: true },
            { text: "Rome", isCorrect: false },
          ],
        },
        {
          question: "What is the chemical symbol for water?",
          answers: [
            { text: "H2O", isCorrect: true },
            { text: "O2", isCorrect: false },
            { text: "CO2", isCorrect: false },
            { text: "HO", isCorrect: false },
          ],
        },
        {
          question: "What planet is known as the Red Planet?",
          answers: [
            { text: "Earth", isCorrect: false },
            { text: "Mars", isCorrect: true },
            { text: "Jupiter", isCorrect: false },
            { text: "Saturn", isCorrect: false },
          ],
        },
      ],
    },
  ];
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollRef = useRef(null);

  const arrowClickHandler = (direction) => {
    direction === "left"
      ? (scrollRef.current.scrollLeft -= 500)
      : (scrollRef.current.scrollLeft += 500);
  };

  useEffect(() => {
    window.addEventListener("resize", updateArrowsVisibility);

    return () => {
      window.removeEventListener("resize", updateArrowsVisibility);
    };
  }, [window.innerWidth]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", updateArrowsVisibility);
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", updateArrowsVisibility);
      }
    };
  }, []);

  const updateArrowsVisibility = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const scrollWidth = scrollRef.current.scrollWidth;
      const clientWidth = scrollRef.current.clientWidth;

      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
    }
  };

  const cardClickHandler = (index) => {
    dispatch(displayGame(games[index]));
  };

  return (
    <div className="gallery-wrapper">
      <div className="games" ref={scrollRef}>
        {showLeftArrow && (
          <div className="left-arrow" onClick={() => arrowClickHandler("left")}>
            <IoIosArrowBack />
          </div>
        )}
        {games.map((game, idx) => {
          return (
            <Card
              key={idx}
              title={game.title}
              img={game.preview}
              click={() => cardClickHandler(idx)}
            />
          );
        })}
        {showRightArrow && (
          <div
            className="right-arrow"
            onClick={() => arrowClickHandler("right")}
          >
            <IoIosArrowForward />
          </div>
        )}
      </div>
    </div>
  );
}

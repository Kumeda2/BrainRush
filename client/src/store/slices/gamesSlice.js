import { createSlice } from "@reduxjs/toolkit";
import Rating from "../../modules/Rating";

const initialDisplayedGame = {
  game: {
    game_name: null,
    id: null,
    preview: null,
    rating: null,
    questions: [
      {
        question: null,
        id: null,
        maxPoints: null,
        time: null,
        answers: [
          { id: null, answer: null, question_id: null, isCorrect: null },
          { id: null, answer: null, question_id: null, isCorrect: null },
          { id: null, answer: null, question_id: null, isCorrect: null },
          { id: null, answer: null, question_id: null, isCorrect: null },
        ],
      },
    ],
  },
  popularGames: null,
  userGames: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState: initialDisplayedGame,
  reducers: {
    displayGame: (state, action) => {
      state.game = action.payload;
    },
    loadPopularGames: (state, action) => {
      state.popularGames = action.payload;
    },
    loadUserGames: (state, action) => {
      state.userGames = action.payload;
    },
  },
});

export const { displayGame, loadPopularGames, loadUserGames } =
  gamesSlice.actions;
export const gamesReducers = gamesSlice.reducer;

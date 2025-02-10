import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  popularGames: [],
  userGames: [],
  hasMorePublicGames: true,
  hasMoreUserGames: true,
};

const gamesSlice = createSlice({
  name: "games",
  initialState: initialState,
  reducers: {
    displayGame: (state, action) => {
      state.game = action.payload;
    },
    loadPopularGames: (state, action) => {
      state.popularGames.push(...action.payload.games);
      if (
        action.payload.remainingGames < 6
      ) {
        state.hasMorePublicGames = false;
      }
    },
    resetPopularGames: (state, action) => {
      state.popularGames = [];
    },
    loadUserGames: (state, action) => {
      state.userGames.push(...action.payload.games);
      if (
        action.payload.remainingGames < 12
      ) {
        state.hasMoreUserGames = false;
      }
    },
    resetUserGames: (state) => {
      state.userGames = [];
      state.hasMoreUserGames = true;
    }
  },
});

export const { displayGame, loadPopularGames, resetPopularGames, loadUserGames, resetUserGames } =
  gamesSlice.actions;
export const gamesReducers = gamesSlice.reducer;

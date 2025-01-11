import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialDisplayedGame = {
  game: {
    title: "",
    preview: "",
    questions: [
      {
        question: "",
        answers: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: true },
          { text: "", isCorrect: false },
        ],
      },
    ],
  },
};

const displayedGameSlice = createSlice({
  name: "displayedGame",
  initialState: initialDisplayedGame,
  reducers: {
    displayGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { displayGame } = displayedGameSlice.actions;

const displayedGameStore = configureStore({
  reducer: {
    currentGame: displayedGameSlice.reducer,
  },
});

export default displayedGameStore;

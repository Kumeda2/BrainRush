import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  players: [],
  player: {},
};

const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
    removePlayer: (state, action) => {
      state.players = state.players.filter(player => player.username !== action.payload.username);
    },
    setPlayer: (state, action) => {
      state.player = action.payload;
    }
  },
});

export const { updatePlayers, removePlayer, setPlayer } = playersSlice.actions;
export const playersReducer = playersSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import { gamesReducers } from "./slices/gamesSlice";
import { userReducers } from "./slices/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import fetchUserMiddleware from "./middleware/fetchUserMiddleware";
import { playersReducer } from "./slices/playersSlice";
import { socketReducers } from "./slices/socketSlice";
import createTransform from "redux-persist/es/createTransform";

const gameTransform = createTransform(
  (inboundState) => inboundState.game, 
  (outboundState) => ({
    ...initialState,
    game: outboundState,
  }),
  { whitelist: ["game"] }
);

const persistGamesConfig = {
  key: "games",
  storage: storageSession,
  transforms: [gameTransform],
};

const persistUsersConfig = {
  key: "user",
  storage: storageSession,
};



const persistPlayersConfig = {
  key: "players",
  storage: storageSession,
}

const persistedUserReducer = persistReducer(persistUsersConfig, userReducers);
const persistedGamesReducer = persistReducer(persistGamesConfig, gamesReducers);
const persistedPlayersReducer = persistReducer(persistPlayersConfig, playersReducer);

export const store = configureStore({
  reducer: {
    games: persistedGamesReducer,
    user: persistedUserReducer,
    players: persistedPlayersReducer,
    socket: socketReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(fetchUserMiddleware),
});

export const persistor = persistStore(store);

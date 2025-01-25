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

const persistConfig = {
  key: "user",
  storage: storageSession,
};

const persistedUserReducer = persistReducer(persistConfig, userReducers);

const displayedGameStore = configureStore({
  reducer: {
    games: gamesReducers,
    user: persistedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(fetchUserMiddleware),
});

export const store = displayedGameStore;
export const persistor = persistStore(store);

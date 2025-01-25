//In this file implemented async actions handling with redux-thunk 
// for comparing custom middleware with redux-thunk

import UserService from "../../services/UserService";
import { displayGame, loadPopularGames, loadUserGames } from "../slices/gamesSlice";

export const getGame = (gameId) => async (dispatch) => {
    try {
        const data = await UserService.getGame(gameId);
        dispatch(displayGame(data));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getPopularGames = () => async (dispatch) => {
    try {
        const data = await UserService.getPopular();
        dispatch(loadPopularGames(data));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserGames = (username) => async (dispatch) => {
    try {
        const data = await UserService.getUserGames(username);
        dispatch(loadUserGames(data))
    } catch (error) {
        console.log(error);
        throw error;
    }
}
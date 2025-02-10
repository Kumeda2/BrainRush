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

export const getPopularGames = (username, offset = 0, limit = 6) => async (dispatch) => {
    try {
        const data = await UserService.getPopular(username, offset, limit);
        dispatch(loadPopularGames(data));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getUserGames = (username, offset = 0, limit = 12) => async (dispatch) => {
    try {
        const data = await UserService.getUserGames(username, offset, limit);
        dispatch(loadUserGames(data))
    } catch (error) {
        console.log(error);
        throw error;
    }
}
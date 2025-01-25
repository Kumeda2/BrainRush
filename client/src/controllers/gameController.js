import UserService from "../services/UserService";

export const createGame = (game, host) => {
    try {
        const data = UserService.createGame(game, host);
        
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const deleteGame = (gameId) => {
    try {
        const data = UserService.deleteGame(gameId);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateGame = (gameId, updatedGame) => {
    try {
        const data = UserService.updateGame(gameId, updatedGame);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateQuestion = (questionId, updatedQuestion) => {
    try {
        const data = UserService.updateQuestion(questionId, updatedQuestion);
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const updateAnswer = (answerId, updatedAnswer) => {
    try {
        const data = UserService.updateAnswer(answerId, updatedAnswer);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
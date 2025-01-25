const gameService = require("../services/gameService");

class UserActionsController {
  async create(req, res, next) {
    try {
      const { game_name, preview, rating, isPrivate, questions } = req.body;
      const { host } = req.params;
      const gameData = await gameService.createGame(game_name, preview, rating, isPrivate, questions, host);

      return res.json(gameData);
    } catch (e) {
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
      const { gameId } = req.params;
      const gameData = await gameService.deleteGame(gameId);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async changeGame(req, res, next) {
    try {
      const { gameId } = req.params;
      const { updatedGame } = req.body;
      const gameData = await gameService.updateGame(gameId, updatedGame);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async changeQuestion(req, res, next) {
    try {
      const {questionId} = req.params;
      const {updatedQuestion} = req.body;
      const gameData = await gameService.updateQuestion(questionId, updatedQuestion);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async changeAnswer(req, res, next) {
    try {
      const {answerId} = req.params;
      const {updatedAnswer} = req.body;
      const gameData = await gameService.updateAnswer(answerId, updatedAnswer);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async changeMark(req, res, next) {
    try {
      const {gameId, host, mark } = req.params;
      const gameData = await gameService.updateMark(gameId, host, mark);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async getGame(req, res, next) {
    try {
      const { gameId } = req.params;
      const gameData = await gameService.getOneGame(gameId);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async getUserGames(req, res, next) {
    try {
      const { username } = req.params;
      const gameData = await gameService.getAllUserGames(username);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async getPopular(req, res, next) {
    try {
      const gameData = await gameService.getPopularGames();

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserActionsController();

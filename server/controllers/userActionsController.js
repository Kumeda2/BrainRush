const gameService = require("../services/gameService");

class UserActionsController {
  async create(req, res, next) {
    try {
      const { game } = req.body;
      const { username } = req.params;

      const gameData = await gameService.createGame(game, username);

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
      const { offset, limit } = req.query;
      const gameData = await gameService.getAllUserGames(username, offset, limit);

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }

  async getPopular(req, res, next) {
    try {
      const { username, offset, limit } = req.query; 
      const gameData = await gameService.getPopularGames(username, Number(offset), Number(limit));

      return res.json(gameData)
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserActionsController();

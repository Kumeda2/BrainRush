import $api from "../http";

export default class UserService {
  static async createGame(game, host) {
    try {
      const response = await $api.post(`/games/${host}`, {
        game,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async deleteGame(gameId) {
    try {
      const response = await $api.delete(`/games/${gameId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateGame(gameId, updatedGame) {
    try {
      const response = await $api.put(`/games/${gameId}`, {
        updatedGame,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateMark(gameId, username, mark) {
    try {
      const response = await $api.put(`/games/${gameId}/${username}/${mark}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateQuestion(questionId, updatedQuestion) {
    try {
      const response = await $api.put(`/questions/${questionId}`, {
        updatedQuestion,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async updateAnswer(answerId, updatedAnswer) {
    try {
      const response = await $api.put(`/answers/${answerId}`, {
        updatedAnswer,
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getGame(gameId) {
    try {
      const response = await $api.get(`/games/${gameId}`);

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getUserGames(username, offset = 0, limit = 12) {
    try {
      const response = await $api.get(`/users/${username}/games`, {
        params: { offset, limit },
      });

      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static async getPopular(username, offset = 0, limit = 6) {
    try {
      const response = await $api.get(`/popular`, {
        params: { username, offset, limit },
      });
      
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

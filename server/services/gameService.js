const pool = require("../database/pool");
const GameDto = require("../dtos/gameDto");
const QuestionDto = require("../dtos/questionDto");
const ApiError = require("../exceptions/apiError");
const auth_middleware = require("../middlewares/auth_middleware");
const fs = require("fs");
const fsPromises = require("fs/promises");

class GameService {
  async createGame(game_name, preview, rating, isPrivate, questions, host) {
    try {
      let query = `
        SELECT * FROM game 
        WHERE game_name = $1
      `;

      const gameCandidate = await pool.query(query, [game_name]);

      if (gameCandidate.rows.length > 0) {
        throw ApiError.BadRequest("Game with this name already exists");
      }

      query = `
        SELECT * FROM game_host 
        WHERE nickname = $1
      `;

      const hostCandidate = await pool.query(query, [host]);

      let hostId;
      query = `
        INSERT INTO game_host(nickname)
        VALUES($1) RETURNING id
      `;

      if (hostCandidate.rows.length === 0) {
        const hostData = await pool.query(query, [host]);

        hostId = hostData.rows[0].id;
      } else {
        hostId = hostCandidate.rows[0].id;
      }

      const creatingTime = new Date(Date.now()).toISOString().split("T")[0];

      let fileData = null;

      if (await fsPromises.access(preview).then(() => true).catch(() => false)) {
        fileData = await fsPromises.readFile(preview);
      }

      query = `
        INSERT INTO game(game_name, date, rating, preview, private, host_id) 
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING id
      `;

      const gameData = await pool.query(query, [
        game_name,
        creatingTime,
        rating,
        preview,
        isPrivate,
        hostId,
      ]);

      for (const item of questions) {
        query = `
          INSERT INTO question(question, max_points, game_id, time) 
          VALUES($1, $2, $3, $4) 
          RETURNING id
        `;

        const questionData = await pool.query(query, [
          item.question,
          item.maxPoints,
          gameData.rows[0].id,
          item.time,
        ]);

        for (const answer of item.answers) {
          query = `
            INSERT INTO answer(answer, is_correct, question_id) 
            VALUES($1, $2, $3)
          `;

          await pool.query(query, [
            answer.text,
            answer.isCorrect,
            questionData.rows[0].id,
          ]);
        }
      }
      return {
        message: "Game created successfully",
        gameId: gameData.rows[0].id,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while creating game: ${e.message}`);
      }
      throw e;
    }
  }

  async deleteGame(id) {
    try {
      let query = `
        SELECT * FROM game 
        WHERE id = $1
      `;

      const gameCandidate = await pool.query(query, [id]);
      if (gameCandidate.rows.length > 0) {
        let query = `
          DELETE FROM game
          WHERE id = $1 
          RETURNING game_name
        `;

        const deletedGame = await pool.query(query, [id]);
        return {
          message: "Game deleted successfully",
          gameName: deletedGame.rows[0].game_name,
        };
      }

      throw ApiError.BadRequest("Game doesn`t exists");
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while deleting game: ${e.message}`);
      }
      throw e;
    }
  }

  async updateGame(gameId, updatedGame) {
    try {
      const query = `
        UPDATE game
        SET game_name = $1, rating = $2, preview = $3
        WHERE id = $4
        RETURNING id
      `;

      const updatedGameData = await pool.query(query, [
        updatedGame.gameName,
        updatedGame.rating,
        updatedGame.preview,
        gameId,
      ]);

      if (updatedGameData.rows.length === 0) {
        throw ApiError.BadRequest("Game not found");
      }

      for (const question of updatedGame.questions) {
        await this.updateQuestion(question.id, question);
      }

      return {
        message: "Game updated successfully",
        gameId: updatedGameData.rows[0].id,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while updating game: ${e.message}`);
      }
      throw e;
    }
  }

  async updateQuestion(questionId, updatedQuestion) {
    try {
      const query = `
        UPDATE question
        SET question = $1, max_points = $2, time = $3
        WHERE id = $4
        RETURNING id
      `;

      const updatedQuestionData = await pool.query(query, [
        updatedQuestion.question,
        updatedQuestion.maxPoints,
        updatedQuestion.time,
        questionId,
      ]);

      if (updatedQuestionData.rows.length === 0) {
        throw ApiError.BadRequest("Question not found");
      }

      return {
        message: "Question updated successfully",
        questionId: updatedQuestionData.rows[0].id,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while updating question: ${e.message}`);
      }
      throw e;
    }
  }

  async updateAnswer(answerId, updatedAnswer) {
    try {
      const query = `
        UPDATE answer
        SET answer = $1, is_correct = $2
        WHERE id = $3
        RETURNING id
      `;

      const updatedAnswerData = await pool.query(query, [
        updatedAnswer.answer,
        updatedAnswer.isCorrect,
        answerId,
      ]);

      if (updatedAnswerData.rows.length === 0) {
        throw ApiError.BadRequest("Answer not found");
      }

      return {
        message: "Answer updated successfully",
        answerId: updatedAnswerData.rows[0].id,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while updating answer: ${e.message}`);
      }
      throw e;
    }
  }

  async getOneGame(gameId) {
    try {
      let query = `
        SELECT * FROM game
        WHERE id = $1
      `;

      const gameData = await pool.query(query, [gameId]);

      if ((gameData.rows.length === 0)) {
        throw ApiError.BadRequest("Game doesn't exist");
      }

      query = `
        SELECT * FROM question
        WHERE game_id = $1
      `;
      const questionData = await pool.query(query, [gameId]);
      let questionArray = [];

      for (const question of questionData.rows) {
        query = `
          SELECT * FROM answer
          WHERE question_id = $1
        `;

        const answerData = await pool.query(query, [question.id]);

        const questionDto = new QuestionDto(question, answerData.rows);
        questionArray.push(questionDto);
      }

      const gameDto = new GameDto(gameData.rows[0], questionArray);
      console.log(gameDto)
      return {
        ...gameDto,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while getting game: ${e.message}`);
      }
      throw e;
    }
  }

  async getAllUserGames(username) {
    try {
      let query = `
        SELECT * FROM game_host
        WHERE nickname = $1
      `;

      const hostData = await pool.query(query, [username]);

      if (hostData.rows.length === 0) {
        throw ApiError.BadRequest("User doesn't exists");
      }

      query = `
        SELECT * FROM game
        WHERE host_id = $1
      `;

      const gamesData = await pool.query(query, [hostData.rows[0].id]);

      if (gamesData.rows.length === 0) {
        throw ApiError.BadRequest("User doesn't have any games");
      }

      return gamesData.rows;
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while getting games: ${e.message}`);
      }
      throw e;
    }
  }

  async getPopularGames() {
    try {
      let query = `
        SELECT * FROM game
        WHERE private = false
        ORDER BY rating DESC
        LIMIT 6
      `;

      const games = await pool.query(query);

      if (games.rows.length > 0) return games.rows;
      else throw ApiError("Games doesn't exist")

    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while getting game: ${e.message}`);
      }
      throw e;
    }
  }

  async updateMark(gameId, host, mark) {
    try {
      let query = `
        SELECT * FROM game_host
        WHERE nickname = $1
      `
      let hostData = await pool.query(query, [host]);

      if (hostData.rows.length === 0) {
        query = `
          INSERT INTO game_host(nickname)
          VALUES($1) RETURNING id
        `

        hostData = await pool.query(query, [host]);
      }

      query = `
        SELECT * FROM mark
        WHERE game_id = $1 AND host_id = $2
      `;

      const markData = await pool.query(query, [gameId, hostData.rows[0].id]);

      if (markData.rows.length === 0) {
        query = `
          INSERT INTO mark(game_id, host_id, mark)
          VALUES($1, $2, $3)
          RETURNING mark
        `;

        const updatedMark = await pool.query(query, [gameId, hostData.rows[0].id, mark]);
        return {
          message: "Mark added successfully",
          mark: updatedMark.rows[0].mark,
        };
      }

      query = `
        UPDATE mark
        SET mark = $1
        WHERE game_id = $2 AND host_id = $3
        RETURNING mark
      `;

      const updatedMark = await pool.query(query, [mark, gameId, hostData.rows[0].id]);

      return {
        message: "Mark updated successfully",
        mark: updatedMark.rows[0].mark,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while updating mark: ${e.message}`);
      }
      throw e;
    }
  }
}

module.exports = new GameService();

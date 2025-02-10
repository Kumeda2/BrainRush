const pool = require("../database/pool");
const GameDto = require("../dtos/gameDto");
const QuestionDto = require("../dtos/questionDto");
const ApiError = require("../exceptions/apiError");

class GameService {
  async createGame(game, host) {
    try {
      let query = `
        SELECT * FROM game 
        WHERE game_name = $1
      `;

      const gameCandidate = await pool.query(query, [game.game_name]);

      if (gameCandidate.rows.length > 0) {
        throw ApiError.BadRequest("Game with this name already exists");
      }

      query = `
        SELECT * FROM game_host 
        WHERE nickname = $1
      `;

      const hostCandidate = await pool.query(query, [host]);

      let hostId;

      if (hostCandidate.rows.length === 0) {
        query = `
          INSERT INTO game_host(nickname)
          VALUES($1) RETURNING id
        `;

        const hostData = await pool.query(query, [host]);

        hostId = hostData.rows[0].id;
      } else {
        hostId = hostCandidate.rows[0].id;
      }

      const creatingTime = new Date(Date.now()).toISOString().split("T")[0];

      query = `
        INSERT INTO game(game_name, date, rating, preview, private, host_id) 
        VALUES($1, $2, $3, $4, $5, $6) 
        RETURNING id
      `;

      const gameData = await pool.query(query, [
        game.game_name,
        creatingTime,
        game.rating,
        game.preview,
        game.isPrivate,
        hostId,
      ]);

      for (const item of game.questions) {
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
            answer.answer,
            answer.is_correct,
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
    console.log(updatedGame);
    try {
      let query = `
        UPDATE game
        SET game_name = $1, rating = $2, preview = $3, date = $4, private = $5
        WHERE id = $6
        RETURNING id
      `;

      const updatingTime = new Date(Date.now()).toISOString().split("T")[0];

      const updatedGameData = await pool.query(query, [
        updatedGame.game_name,
        updatedGame.rating,
        updatedGame.preview,
        updatingTime,
        updatedGame.isPrivate,
        gameId,
      ]);

      if (updatedGameData.rows.length === 0) {
        throw ApiError.BadRequest("Game not found");
      }

      query = `
        DELETE FROM question
        WHERE game_id = $1
      `;

      await pool.query(query, [updatedGameData.rows[0].id]);

      for (const question of updatedGame.questions) {
        query = `
          INSERT INTO question(question, max_points, game_id, time)
          VALUES($1, $2, $3, $4)
          RETURNING id
        `;

        const questionData = await pool.query(query, [
          question.question,
          question.maxPoints,
          updatedGameData.rows[0].id,
          question.time,
        ]);

        for (const answer of question.answers) {
          query = `
            INSERT INTO answer(answer, is_correct, question_id)
            VALUES($1, $2, $3)
          `;

          await pool.query(query, [
            answer.answer,
            answer.is_correct,
            questionData.rows[0].id,
          ]);
        }
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

  async getOneGame(gameId) {
    try {
      let query = `
        SELECT * FROM game
        WHERE id = $1
      `;

      const gameData = await pool.query(query, [gameId]);

      if (gameData.rows.length === 0) {
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

  async getAllUserGames(username, offset = 0, limit = 12) {
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
        LIMIT $2 OFFSET $3
      `;

      const gamesData = await pool.query(query, [hostData.rows[0].id, limit, offset]);
      if (gamesData.rows.length === 0) {
        throw ApiError.BadRequest("User doesn't have any games");
      }

      query = `
        SELECT COUNT(*) FROM game
        WHERE host_id = $1
      `;
      const totalUserGames = await pool.query(query, [hostData.rows[0].id])

      const remainingGames = totalUserGames.rows[0].count - (offset + limit);
      console.log(remainingGames);
      return {
        games: gamesData.rows,
        remainingGames,
      };
    } catch (e) {
      if (!(e instanceof ApiError)) {
        throw new Error(`Error while getting games: ${e.message}`);
      }
      throw e;
    }
  }

  async getPopularGames(username, offset = 0, limit = 6) {
    try {
      let query = `
        SELECT game.id, game_name, rating, preview  FROM game
        JOIN game_host ON game.host_id = game_host.id
        WHERE private = false and game_host.nickname != $1
        ORDER BY rating DESC
        LIMIT $2 OFFSET $3
      `;

      const games = await pool.query(query, [username, limit, offset]);

      query = `
        SELECT COUNT(*) FROM game
        WHERE private = false
      `;
      const totalGames = await pool.query(query);

      const remainingGames = totalGames.rows[0].count - (offset + limit);

      console.log(games.rows)

      return {
        games: games.rows,
        remainingGames,
      };
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
      `;
      let hostData = await pool.query(query, [host]);

      if (hostData.rows.length === 0) {
        query = `
          INSERT INTO game_host(nickname)
          VALUES($1) RETURNING id
        `;

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

        const updatedMark = await pool.query(query, [
          gameId,
          hostData.rows[0].id,
          mark,
        ]);
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

      const updatedMark = await pool.query(query, [
        mark,
        gameId,
        hostData.rows[0].id,
      ]);

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

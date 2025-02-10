module.exports = class GameDto {
  id;
  game_name;
  rating;
  preview;
  questions;
  is_private;

  constructor(gameRecord, questionDtoArray) {
    this.id = gameRecord.id;
    this.game_name = gameRecord.game_name;
    this.preview = gameRecord.preview;
    this.rating = gameRecord.rating;
    this.questions = questionDtoArray;
    this.is_private = gameRecord.private
  }
};

module.exports = class GameDto {
  id;
  game_name;
  marks;
  rating;
  preview;
  questions;

  constructor(gameRecord, questionDtoArray) {
    this.id = gameRecord.id;
    this.game_name = gameRecord.game_name;
    this.preview = gameRecord.preview;
    this.marks = gameRecord.marks;
    this.rating = gameRecord.rating;
    this.questions = questionDtoArray;
  }
};

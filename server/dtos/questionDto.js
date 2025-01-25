module.exports = class QuestionDto {
  id;
  question;
  maxPoints;
  time;
  answers;

  constructor(questionRecord, answersRecord) {
    this.id = questionRecord.id;
    this.question = questionRecord.question;
    this.maxPoints = questionRecord.max_points;
    this.time = questionRecord.time;
    this.answers = answersRecord;
  }
};

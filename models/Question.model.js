const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const questionSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: [true, "Title is required."] },
    text: { type: String, required: [true, "Text is required."] },
    languages: {
      type: [String],
      enum: ["JavaScript", "Python", "Java", "C++", "C#"],
    },
    image: {
      type: String,
    },

    answers: { type: Schema.Types.ObjectId, ref: "Answer" }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Question = model("Question", questionSchema);

module.exports = Question;

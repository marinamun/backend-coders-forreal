const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const answerSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    question: {type: Schema.Types.ObjectId, ref: "Question" },
    text: { type: String, required: [true, "Text is required."] },
    
    photo: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Answer = model("Answer", answerSchema);

module.exports = Answer;

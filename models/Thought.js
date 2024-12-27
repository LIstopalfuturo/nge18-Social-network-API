const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    ThoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get:(date)=>{
        return date.toLocalDateString();
      }
    },
    username: {
      type: String,
      require: true,
    },
   
    reaction: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per thought
thoughtSchema
  .virtual('getResponses')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Thought model
const Thought = model('thoughts', thoughtSchema);

module.exports = Thought;

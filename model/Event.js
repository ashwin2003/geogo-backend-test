const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
  slug: {
    type: String,
    required: [true, "Enter slug."],
  },
  name: {
    type: String,
    required: [true, "Enter name."],
  },
  description: {
    type: String,
    required: [true, "Enter description."],
  },
  poster: {
    type: String,
    default:
      "http://res.cloudinary.com/dgsjlfsoi/image/upload/v1670108543/ooaxkjhc9fcaigsoxpnh.jpg",
  },
  start_date: {
    type: Date,
    required: [true, "Enter start date."],
  },
  end_date: {
    type: Date,
    required: [true, "Enter end date."],
  },
  published: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Event", eventSchema);

const mongoose = require("mongoose");

const TicketSchema = mongoose.Schema({
  eventId: {
    type: mongoose.Types.ObjectId,
    required: [true, "Enter event id."],
    ref: "Event",
  },
  description: {
    type: String,
    required: [true, "Enter description."],
  },
  date: {
    type: Date,
    required: [true, "Enter date."],
  },
  price: {
    type: Number,
    required: [true, "Enter price."],
  },
  total_quantity: {
    type: Number,
    required: [true, "Enter total quantity."],
  },
  available_quantity: {
    type: Number,
    required: [true, "Enter available quantity."],
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);

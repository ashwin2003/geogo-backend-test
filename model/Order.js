const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  ownerId: {
    type: mongoose.Types.ObjectId,
    require: [true, "Enter ownerId"],
  },
  eventId: {
    type: mongoose.Types.ObjectId,
    require: [true, "Enter eventId"],
  },
  eventName: {
    type: String,
    require: [true, "Enter event name"],
  },
  ticketId: {
    type: mongoose.Types.ObjectId,
    require: [true, "Enter ticketId"],
  },
  purchase_date: {
    type: Date,
    require: [true, "Enter purchase_date"],
  },
  total_price: {
    type: Number,
    require: [true, "Enter total price"],
  },
  numSeats: {
    type: Number,
    require: [true, "Enter number of seats"],
  },
  status: {
    type: String,
    default: "Confirmed",
  },
});

module.exports = mongoose.model("Orders", orderSchema);

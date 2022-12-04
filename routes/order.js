const express = require("express");
const verifyToken = require("../middleware/auth");
const Event = require("../model/Event");
const Order = require("../model/Order");
const Ticket = require("../model/Ticket");
const mongoose = require("mongoose");
const sendEmail = require("../utils/sendEmail");

const app = express();

app.post("/add", verifyToken, async (req, res) => {
  const { ticketId, numSeats } = req.body;
  const userId = req.user.id;

  try {
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) throw "Enter valid ticketId.";

    const event = await Event.findById(ticket.eventId);
    if (!event) throw "In-valid eventId.";

    const purchase_date = new Date();

    if (purchase_date > ticket.date) throw "Ticket date is not valid.";

    if (ticket.available_quantity < numSeats)
      throw `${numSeats} seats are not avilable, select less seats.`;

    const updateTicket = await Ticket.findByIdAndUpdate(ticketId, {
      $inc: { available_quantity: -numSeats },
    });

    if (!updateTicket) throw "Seats not alloted.";

    const total_price = ticket.price * numSeats;

    const orderData = {
      ownerId: userId,
      eventId: ticket.eventId,
      eventName: event.name,
      ticketId,
      purchase_date,
      total_price,
      numSeats,
      status: "Confirmed",
    };

    const newOrder = new Order(orderData);
    const add = await newOrder.save();

    const emailOptions = {
      email: req.user.email,
      subject: "Congratulations your order is placed.",
      message: `Your order for ${event.name}, ${numSeats} seats is successfully placed. \n \n This is a Demo mail for GeoGo Assignment. \n \n Regards \n Ashwin Jagarwal`,
    };

    const emailSent = await sendEmail(emailOptions);

    return res.status(200).send("Order Created");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// Get Orders for a user
app.get("/", verifyToken, async (req, res) => {
  const userId = req.user.id;

  try {
    const orders = await Order.find({ ownerId: userId });

    return res.status(200).send(orders);
  } catch (error) {
    return res.status(500).send(error);
  }
});

app.put("/cancel/:orderId", verifyToken, async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findByIdAndUpdate(orderId, req.body);

    return res.status(200).send("Order Cancelled");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = app;

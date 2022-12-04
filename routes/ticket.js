const express = require("express");
const verifyToken = require("../middleware/auth");
const Ticket = require("../model/Ticket");

const app = express();

// Create Ticket
app.post("/add", verifyToken, async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    if (!newTicket) throw "Enter valid ticked data.";

    const add = await newTicket.save();

    return res.status(200).send("Ticket created.");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Get Tickets for a Event
app.get("/:eventId", async (req, res) => {
  const today = new Date().toISOString();

  const eventId = req.params.eventId;
  try {
    const ticket = await Ticket.find({
      eventId: eventId,
      date: { $gte: today },
    });

    return res.status(200).send(ticket);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = app;

const express = require("express");
const Event = require("../model/Event");
const verifyToken = require("../middleware/auth");

const app = express();

// Create Event
app.post("/add", verifyToken, async (req, res) => {
  const { slug, name, description, poster, start_date, end_date, published } =
    req.body;
  console.log(req.body);
  if (!slug || !name || !description || !start_date || !end_date)
    return res.send("Enter all event data.");

  try {
    const newEvent = new Event({
      slug,
      name,
      description,
      poster,
      start_date,
      end_date,
      published,
    });
    const add = await newEvent.save();

    return res.status(200).send("Event Added.");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

// Get all Events
app.get("/all", async (req, res) => {
  try {
    const today = new Date().toISOString();

    const events = await Event.find({ end_date: { $gte: today } });

    return res.status(200).send(events);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Read Event
app.get("/:eventId", async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findById(eventId);

    if (!event) throw "Event not found.";

    return res.status(200).send(event);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Update Event
app.put("/:eventId", verifyToken, async (req, res) => {
  const eventId = req.params.eventId;

  try {
    const event = await Event.findByIdAndUpdate(eventId, req.body);

    if (!event) throw "Enter valid event id.";

    return res.status(200).send("Event updated.");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// Delete Event
app.delete("/:eventId", async (req, res) => {
  const eventID = req.params.eventId;

  try {
    const event = await Event.findByIdAndDelete(eventID);
    if (!event) throw "Enter valid event id.";
    return res.status(200).send("Event deleted");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = app;

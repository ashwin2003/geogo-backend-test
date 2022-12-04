const express = require("express");
const database = require("./config/database");
const app = express();

// Routes import
const userRoutes = require("./routes/user.js");
const eventRoutes = require("./routes/event.js");
const ticketRoutes = require("./routes/ticket.js");
const orderRoutes = require("./routes/order.js");

require("dotenv").config();

database();

app.use(express.json());

app.get("/", async (req, res) => {
  return res
    .status(200)
    .send(
      "Thank you GeoGo, for giving me this opportunity to showcase my skills. I hope you will like my work."
    );
});

app.use("/user", userRoutes);
app.use("/event", eventRoutes);
app.use("/ticket", ticketRoutes);
app.use("/order", orderRoutes);

module.exports = app;

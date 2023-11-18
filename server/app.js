const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const weekDataRoutes = require("./routes/v1/weekDataRoutes");
const authRoutes = require("./routes/v1/authRoutes");
const exerciseRoutes = require("./routes/v1/exerciseRoutes");
const roughPadRoutes = require("./routes/v1/roughPadRoutes");
const notificationRoutes = require("./routes/v1/notificationRoutes");

require("dotenv").config();

// const { requestLogger, errorLogger } = require("./logger");

const app = express();
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: process.env.ALLOWED_METHODS,
    credentials: true,
  })
);

mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   const logMessage = `${req.method} ${req.url}`;
//   requestLogger.info(logMessage);
//   next();
// });

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/week-planner", weekDataRoutes);
app.use("/api/v1/exercises", exerciseRoutes);
app.use("/api/v1/rough-pad", roughPadRoutes);
app.use("/api/v1/notification", notificationRoutes);

// app.use((err, req, res, next) => {
//   errorLogger.error(err.message);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

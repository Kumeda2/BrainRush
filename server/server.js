require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRouter = require("./router/auth_router.js");
// const userRouter = require("./router/user_router.js");
const errorMiddleware = require("./middlewares/error_middleware");
const { Server } = require("socket.io");
const socketConnection = require("./services/socketService.js");

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());
app.use("/api", authRouter);
// app.use("/api", userRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    const expressServer = app.listen(process.env.PORT, () =>
      console.log(`Server started on PORT: ${process.env.PORT}`)
    );

    socketConnection(expressServer);
  } catch (e) {
    console.log(e);
  }
};

start();

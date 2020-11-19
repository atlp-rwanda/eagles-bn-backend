/* eslint-disable linebreak-style */
import "@babel/polyfill";
import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import passport from "passport";
import swaggerDocument from "../swagger.json";

import {
    facebookStrategy,
    googleStrategy,
    // jwtStrategy,
} from "./config/passport";
import routes from "./routes/index";
import multipart from 'connect-multiparty';
var multipartMiddleware = multipart();
import bookings from "./routes/booking";
import rating from "./routes/rating"
import accomodationRoutes from "./routes/accomodation";
import roomRoutes from "./routes/room";
import chat from './controllers/chat';
import socketAuth from './middlewares/socketio.auth';
import signAccessToken from './helpers/jwt_helper'

dotenv.config();
const serverPort = process.env.PORT || 4000;
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
// const http = require("http").Server(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());
passport.use(googleStrategy);
passport.use(facebookStrategy);
app.use(multipartMiddleware);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// app.use("/api/user", routes)
app.use("/api", routes);
app.use("/api/user", routes);
app.use("/api/rooms", bookings);
app.use("/api/accommodations", rating);
app.get("/chatBot", (req, res) => {
  res.sendFile(`${__dirname}/chatBot.html`);
});
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
io.use(socketAuth);
chat(io);

http.listen(
  serverPort,
  console.log(`Server has started on port ${serverPort}`)
);

export default app;
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
dotenv.config();
const serverPort = process.env.PORT || 4000;
const app = express();
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
app.listen(serverPort, console.log(`Server has started on port ${serverPort}`));

export default app;

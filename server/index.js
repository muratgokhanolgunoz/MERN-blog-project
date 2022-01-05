import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/posts.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3001;

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.json({ urlEncoded: "30mb", extended: true }));
app.use(cors());

app.get("/", (request, response) => {
  response.json({
    message: "Listening ...",
    result: [],
  });
});

app.use("/posts", routes);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`=> Port ${PORT} is listening`);
    });
  })
  .catch((error) => error.message);

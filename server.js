require("dotenv").config();
import cors from "cors";
import express, { json } from "express";
import mongoose from "mongoose";
import { corsOptions } from "./cors";
import auth from "./routes/auth";

const app = express();
app.use(json());
app.use(cors(corsOptions));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Database"));

app.use("/api/user", auth);

const PORT = process.env.PORT || 4000;
app.listen(PORT, console.log(`Server is running on port ${PORT}`));

import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/connection";
import route from "./routes/router";
// var routesApi = require('./routes/router');

dotenv.config();
const app = express();
const port = process.env.SERVER_PORT || 5000;

connectDB();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
    res.send("hello");
});
// load routers
app.use("/", route);

app.listen(port);

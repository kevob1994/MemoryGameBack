import express from "express";
const route = express.Router();
import {
    createHistory,
    getAllHistory,
    updateHistory,
    deleteHistory,
} from "../controller/HistoryController";

route
    .post("/api/history", createHistory)
    .get("/api/history", getAllHistory)
    .put("/api/history/:id", updateHistory)
    .delete("/api/history/:id", deleteHistory);

export default route;

import { Document, Model, model, Types, Schema, Query } from "mongoose"

const newsSchema = new Schema({
    time: { type: String, required: true },
    count_errors: { type: Number, required: true },
});

export const Historydb = model("history", newsSchema);

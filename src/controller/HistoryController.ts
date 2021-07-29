import { Console } from "console";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { History } from "../interfaces/interfaces";
import { Historydb } from "../model/model";
var ObjectId = require("mongodb").ObjectID;
interface IHistoryRequest extends Request {
    body: History;
}

export const createHistory = (req: IHistoryRequest, res: Response) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }
    const { time, count_errors } = req.body;

    const history = new Historydb({
        time,
        count_errors,
    });

    history
        .save(history)
        .then((data: History) => {
            res.send(data);
        })
        .catch((err: any) =>
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the History.",
            })
        );
};

export const getAllHistory = (req: Request, res: Response) => {
    Historydb.find({})
        .then((data: History) => {
            res.send(data);
        })
        .catch((err: any) =>
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the History.",
            })
        );
};

export const updateHistory = (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!",
        });
    }

    const id = req.params.id;

    Historydb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update History with id=${id}. Maybe History was not found!`,
                });
            } else res.send({ message: "History was updated successfully." });
        })
        .catch((err: any) => {
            res.status(500).send({
                message: "Error updating History with id=" + id,
            });
        });
};

export const deleteHistory = (req: Request, res: Response) => {
    const id = req.params.id;

    Historydb.findByIdAndRemove(req.params.id)
        .then((data: any) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete History with id=${id}. Maybe History was not found!`,
                });
            } else {
                res.send({
                    message: "History was deleted successfully!",
                });
            }
        })
        .catch((data: any) => {
            res.status(500).send({
                message: "Could not delete History with id=" + id,
            });
        });
};

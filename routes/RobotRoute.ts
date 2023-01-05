import express, { Request, Response, NextFunction } from "express";
import { collectDatabyDate, collectDatabyDuration, createReport, getReports } from "../controllers/RobotController";

const router = express.Router();

router.post("/report", createReport);
router.get("/reports", getReports);
router.get("/collect-by-date", collectDatabyDate);
router.get("/collect-by-duration", collectDatabyDuration);

export { router as RobotRoute };

import express from "express";
import { createMission, deleteMission, getMissions, updateMission } from "../controllers/MisisonController";

const router = express.Router();

router.post("/create", createMission);
router.get("/get-all-missions", getMissions);
router.patch("/update/:id", updateMission);
router.delete("/delete/:id", deleteMission);


export { router as MissionRoute };

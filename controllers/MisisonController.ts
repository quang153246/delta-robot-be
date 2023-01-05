import { Response, Request, NextFunction } from "express";
import { CreateMissionInput, EditMissionInput } from "../interfaces/Mission";
import { Mission } from "../models/Mission";

export const createMission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        console.log("Create mission")

        const { missionName, startTime, stopTime } = <CreateMissionInput>req.body;

        const isMissionExisting = await Mission.find({missionName: missionName})

        if (!isMissionExisting){
            return res.json({"message": "Mission is already exits"})
        }

        const newMission = await Mission.create({
            missionName: missionName,
            startTime: startTime,
            stopTime: stopTime
        })

        return res.status(200).json(newMission)

    } catch (error) {
        throw error;
    }
  }


  export const getMissions = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        
        const missions = await Mission.find()

        if (missions){
            return res.status(200).json(missions)
        }

        return res.status(400).json({"message": "Songthings wents wrong with get missions"})

    } catch (error) {
        throw error;
    }
  }

//   export const getMissionById = async (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => {
//     try {

//         const {id} = req.params;

//         if (id){
//             const missions = await Mission.findById(id)
//         }
        

//         if (missions){
//             return res.status(200).json(missions)
//         }

//         return res.status(400).json({"message": "Songthings wents wrong with get missions"})

//     } catch (error) {
//         throw error;
//     }
//   }

export const updateMission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const { startTime, stopTime } = <EditMissionInput>req.body;

        const {id} = req.params;

        if (id){
            const missionProfile = await Mission.findById(id)

            if (missionProfile) {
                missionProfile.startTime = startTime;
                missionProfile.stopTime = stopTime;
                const updateResult = await missionProfile.save();

                return res.status(200).json({
                    "message": "Update Mission successfully!",
                    "result": updateResult,
                })
            }
            return res.json({"message": "Mission can not found"})
        }

    
    } catch (error) {
        throw error;
    }
  }



  export const deleteMission = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
        const {id} = req.params

       if (!id) {
           return res.status(400).json({"message": "Id is invalid"})
        }

        const missionProfile = await Mission.findById(id)
        
        if(missionProfile){
            await Mission.findByIdAndRemove(id)

            return res.status(200).json({"message": "Delete mission successfully"})
        }

        return res.status(200).json({"message": "Somethings went wrong with delete mission!"})

    } catch (error) {
        throw error;
    }
  }

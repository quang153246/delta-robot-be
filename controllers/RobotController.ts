import { Response, Request, NextFunction } from "express";
import { ShiftReport } from "../interfaces/Robot";
import { Report } from "../models";

export const createReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { nutDetected, nutPicked, operator } = req.body;
    const createReport = await Report.create({
      nutDetected: nutDetected,
      nutPicked: nutPicked,
      operator: operator,
    });

    return res.json(createReport);
  } catch (error) {
    throw error;
  }
};

export const getReports = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reports = await Report.find();
    return res.json({ reports });
  } catch (error) {
    throw error;
  }
};

export const collectDatabyDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { day, month, year } = req.body;
    
    const records = await Report.find()
    if(records){
      const sumaryData:ShiftReport = {
        nutDetected: 0,
        nutPicked: 0,
  
      }	
  
      records.map( (record) => {
        if (record.createdAt?.getDate() === day && record.createdAt?.getMonth() === month - 1 && record.createdAt?.getFullYear() === year){
          sumaryData.nutDetected += record.nutDetected
          sumaryData.nutPicked += record.nutPicked
        }
      })
      if (sumaryData.nutDetected && sumaryData.nutPicked){
        return res.json(sumaryData)
      }
      return res.json({message: "Can not found data with this time!"})
    }
   
  } catch (error) {
    throw error;
  }
};

export const collectDatabyDuration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const { startDay, startMonth, startYear, endDay, endMonth, endYear } = req.body;
    
    const records = await Report.find()

    if(records){
      const sumaryData:ShiftReport = {
        nutDetected: 0,
        nutPicked: 0,
  
      }	

      records.map( (record) => {

        if (record.createdAt!.getDate() >= startDay 
          && record.createdAt!.getMonth() >= startMonth - 1 
          && record.createdAt!.getFullYear() >= startYear
          && record.createdAt!.getDate() <= endDay 
          && record.createdAt!.getMonth() <= endMonth - 1 
          && record.createdAt!.getFullYear() <= endYear
          ){
            sumaryData.nutDetected += record.nutDetected
            sumaryData.nutPicked += record.nutPicked
        }
      })
      
      if (sumaryData.nutDetected && sumaryData.nutPicked){
        return res.json(sumaryData)
      }
    }
    return res.json({message: "Can not found data with this time!"})

  } catch (error) {
    throw error;
  }
};





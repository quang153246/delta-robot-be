import { User } from "../models";
import { Response, Request, NextFunction } from "express";

import {
  validatePassword,
  generateSalt,
  generatePassword,
} from "./index";

export const initial = async () => {
    try {

      const accountNumber = await User.find().count()
      
      if(!accountNumber){
        const salt = await generateSalt();
        const userPassword = await generatePassword("12345678", salt);
        const adminProfile = {
          username: "admin",
          password: userPassword,
          description: "Administrator account",
          role: "admin",
          phone: ""
        };
  
        await User.create(adminProfile)
      }
    } catch (error) {
      throw error;
    }
};


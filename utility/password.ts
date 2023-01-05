import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {APP_SECRET, EXPIRED_TIME,} from "../config"
import { Request, NextFunction, Response } from "express";
import { AuthPayload } from "../interfaces/User";

export const generateSalt = async () =>{
    return await bcrypt.genSalt();
}

export const generatePassword = async (password: string, salt: string) =>{
    return await bcrypt.hash(password, salt)
}

export const validatePassword = (password: string) => {
    return /[A-Z]/       .test(password) &&
           /[a-z]/       .test(password) &&
           /[0-9]/       .test(password) &&
           /[^A-Za-z0-9]/.test(password) &&
           password.length > 7;
}

export const generateToken = (payload: AuthPayload) => {
    return jwt.sign(payload, APP_SECRET, { expiresIn: EXPIRED_TIME})
}

export const validateToken = async (req: Request) => {
    try {
        const token = req.get('Authorization')
        if (token){
            const payload = jwt.verify(token.split(' ')[1], APP_SECRET) as AuthPayload
            req.user = payload;
            return true
        }

        return false
    } catch (error) {
        return false
    }
    
}

export const validateTokenAdmin = async (req: Request) => {
    try {
        const token = req.get('Authorization')
        if (token){
            const payload = jwt.verify(token.split(' ')[1], APP_SECRET) as AuthPayload
            req.user = payload;
            if (req.user.role === "admin") {
                return true
            }
        }
        return false
    } catch (error) {
        return false
    }
    
}
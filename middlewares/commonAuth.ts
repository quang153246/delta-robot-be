import { AuthPayload } from "../interfaces/User";
import { Response, Request, NextFunction } from "express";
import { validateToken, validateTokenAdmin } from "../utility";

declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateToken(req)
    if(validate){ 
        next();
    }else{
        return res.json({"message": "User is not Authorized"})
    }
}

export const authenticateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const validate = await validateTokenAdmin(req)
    if(validate){ 
        next();
    }else{
        return res.json({"message": "User is not Authorized"})
    }
}
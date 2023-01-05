import express, { Request, Response, NextFunction } from "express";
import { createUser, deleteUserById, getUsers, login, resetPassword } from "../controllers/AdminController";
import { authenticate, authenticateAdmin } from "../middlewares";

const router = express.Router();



router.post("/login", login);

// router.use(authenticateAdmin)
router.post("/user", createUser);
router.get("/users", getUsers);
router.delete("/user/:id", deleteUserById);
router.post("/reset-password", resetPassword);


router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: "Hello from Admin !!!" });
  });


export { router as AdminRoute };

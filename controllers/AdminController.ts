import { Response, Request, NextFunction } from "express";
import { CreateUser, UserLogin } from "../interfaces/User";
import { User } from "../models";
import {
  validatePassword,
  generateSalt,
  generatePassword,
  generateToken,
} from "../utility";
import bcrypt from "bcrypt";
import { RESET_PASSWORD } from "../config";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, description, phone } = <CreateUser>req.body;

    const existingUser = await User.findOne({ username: username });
    if (existingUser !== null) {
      return res.json({ message: "User already exists!" });
    }

    if (!validatePassword(password)) {
      return res.json({ message: "Password is invalid!" });
    }

    const salt = await generateSalt();
    const userPassword = await generatePassword(password, salt);
    const createUser = await User.create({
      username: username,
      password: userPassword,
      description: description,
      role: "user",
      phone: phone || "",
    });

    return res.json(createUser);
  } catch (error) {
    throw error;
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = <UserLogin>req.body;

    if (!username && !password) {
      return res.json({ message: "Please input username and password" });
    }

    const existUser = await User.findOne({ username: username });

    if (existUser === null) {
      return res.status(400).json({ message: "User not Found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, existUser.password);
    if (passwordIsValid) {
      const token = generateToken({
        _id: existUser.id,
        username: existUser.username,
        password: existUser.password,
        role: existUser.role,
      });
      return res.status(200).json({
        token: token,
        username: existUser.username,
      });
    }

    return res.status(400).json({ message: "Password is invalid" });
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.json({ users });
  } catch (error) {
    throw error;
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.json({ message: "Id is invalid" });
    }
    const user = await User.findById(id);

    if (user) {
      await User.findByIdAndRemove(id);
      return res.json({ message: "delete user successfully" });
    } else {
      return res.json({ message: `Can not find user with id: ${id}` });
    }
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (user) {
      const profile = await User.findById(user._id);
      if (profile) {
        const salt = await generateSalt();
        const newPassword = await generatePassword(RESET_PASSWORD, salt);

        profile.password = newPassword;
        const updateResult = await profile.save();
        return res.status(400).json({ message: "Reset password successfully", data: updateResult });
      }
    }
    return res
      .status(400)
      .json({ message: "Something went wrong with reset password" });
  } catch (error) {
    throw error;
  }
};

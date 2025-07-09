import bcrypt from "bcrypt";

import { generateToken } from "../utils/generateToken.js";
import prisma from "../libs/prisma.js";

export async function login(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password)
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res
        .status(400)
        .json({ status: "failed", message: "Invalid credentials" });
    }

    generateToken(user.id, res);

    res.status(200).json({
      id: user.id,
      username: user.username,
    });
  } catch (err) {
    console.log(`Error in Login Controller ${err}`);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export async function register(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: "failed",
        message: "Password must be at least 6 characters long",
      });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (user)
      return res.status(400).json({
        status: "failed",
        message: "That username is already in use",
      });

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    generateToken(newUser.id, res);

    res.status(201).json({
      id: newUser.id,
      username,
    });
  } catch (err) {
    console.log(`Error in Register Controller ${err}`);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export function logout(req, res) {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });

    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully" });
  } catch (err) {
    console.log(`Error in Logout Controller ${err}`);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export function updateProfile(req, res) {
  console.log("test"); // RESI OVO
}

export function check(req, res) {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "Internal Server Error" });
  }
}

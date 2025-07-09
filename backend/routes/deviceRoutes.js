import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  addDevice,
  deleteDevice,
  getDevices,
  updateDevice,
} from "../controllers/deviceController.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", protectRoute, getDevices);
router.post("/", protectRoute, addDevice);
router.put("/:id", protectRoute, updateDevice);
router.delete("/:id", protectRoute, deleteDevice);

export default router;

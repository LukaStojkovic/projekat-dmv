import express from "express";
import { protectRoute } from "../middlewares/authMiddleware.js";
import {
  addDevice,
  deleteDevice,
  getAllDevicesFromUser,
  getBatteryFluctuation,
  getDevices,
  getDeviceStats,
  updateDevice,
} from "../controllers/deviceController.js";

const router = express.Router();

router.use(protectRoute);

router.get("/", protectRoute, getDevices);
router.post("/", protectRoute, addDevice);
router.put("/:id", protectRoute, updateDevice);
router.delete("/:id", protectRoute, deleteDevice);
router.get("/get-device-stats", protectRoute, getDeviceStats);
router.get("/get-all-devices", protectRoute, getAllDevicesFromUser);
router.get("/:id/battery", protectRoute, getBatteryFluctuation);

export default router;

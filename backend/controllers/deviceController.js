import prisma from "../libs/prisma.js";

export async function addDevice(req, res) {
  const { name, type, location } = req.body;

  if (!name || !type || !location) {
    return res
      .status(400)
      .json({ status: "failed", message: "All fields are required" });
  }

  try {
    const existing = await prisma.device.findUnique({ where: { name } });

    if (existing) {
      return res
        .status(400)
        .json({ status: "failed", message: "Device name already exists" });
    }

    const device = await prisma.device.create({
      data: {
        name,
        type,
        location,
        connectionStatus: Math.random() > 0.5 ? "online" : "offline",
        batteryStatus: Math.floor(Math.random() * 101),
        users: {
          create: {
            userId: req.user.id,
          },
        },
      },
    });

    res.status(201).json(device);
  } catch (err) {
    console.log("Error in deviceController:", err);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export async function getDevices(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        devices: {
          include: {
            device: true,
          },
        },
      },
    });

    const devices = user.devices.map((d) => d.device);

    res.status(200).json(devices);
  } catch (err) {
    console.log("Error in deviceController:", err);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export async function updateDevice(req, res) {
  const { id } = req.params;
  const { name, location, type } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid device ID" });
  }

  if (!name || !type || !location) {
    return res
      .status(400)
      .json({ status: "failed", message: "All fields are required" });
  }
  try {
    const deviceId = parseInt(id);

    const relation = await prisma.userDevice.findUnique({
      where: {
        userId_deviceId: {
          userId: req.user.id,
          deviceId,
        },
      },
    });

    if (!relation) {
      return res.status(403).json({
        status: "failed",
        message: "You do not have permission to update this device",
      });
    }

    const isExistingName = await prisma.device.findUnique({
      where: { name },
    });

    if (isExistingName && isExistingName.id !== deviceId) {
      return res.status(400).json({
        status: "failed",
        message: "Device name is already in use",
      });
    }

    const updatedDevice = await prisma.device.update({
      where: { id: deviceId },
      data: {
        name,
        type,
        location,
      },
    });

    res.status(200).json({
      status: "success",
      device: updatedDevice,
    });
  } catch (err) {
    console.error("Error in deviceController:", err);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export async function deleteDevice(req, res) {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid device ID" });
  }

  try {
    const relation = await prisma.userDevice.findUnique({
      where: {
        userId_deviceId: {
          userId: req.user.id,
          deviceId: parseInt(id),
        },
      },
    });

    if (!relation) {
      return res.status(403).json({
        status: "failed",
        message: "You do not have permission to delete this device",
      });
    }

    await prisma.userDevice.delete({
      where: {
        userId_deviceId: {
          userId: req.user.id,
          deviceId: parseInt(id),
        },
      },
    });

    const remainingLinks = await prisma.userDevice.findMany({
      where: { deviceId: parseInt(id) },
    });

    if (remainingLinks.length === 0) {
      await prisma.device.delete({
        where: { id: parseInt(id) },
      });
    }

    res.status(200).json({
      status: "success",
      message: "Device deleted",
      deviceId: id,
    });
  } catch (err) {
    console.error("Error in deviceController:", err);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

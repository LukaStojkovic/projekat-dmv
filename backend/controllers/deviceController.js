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
    console.log("Get Devices Error:", err);
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export function updateDevice() {
  console.log("update device");
}

export function deleteDevice() {
  console.log("delete device");
}

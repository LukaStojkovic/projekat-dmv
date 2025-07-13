import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const deviceTypes = ["Radar", "Semafor", "Senzor", "Kamera"];
const locations = ["Beograd", "Novi Sad", "Niš", "Kragujevac", "Subotica"];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomStatus() {
  return Math.random() > 0.5 ? "online" : "offline";
}

function randomBattery() {
  return Math.floor(Math.random() * 101);
}

async function main() {
  await prisma.userDevice.deleteMany();
  await prisma.device.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash("123456", 12);
  const users = [];

  for (let i = 1; i <= 30; i++) {
    const user = await prisma.user.create({
      data: {
        username: `user${i}`,
        password,
      },
    });
    users.push(user);
  }

  const devices = [];

  for (let i = 1; i <= 200; i++) {
    const device = await prisma.device.create({
      data: {
        name: `Device ${i}`,
        type: getRandom(deviceTypes),
        location: getRandom(locations),
        connectionStatus: randomStatus(),
        batteryStatus: randomBattery(),
      },
    });
    devices.push(device);
  }

  for (const device of devices) {
    const numLinks = Math.floor(Math.random() * 3) + 2;
    const shuffledUsers = [...users].sort(() => 0.5 - Math.random());

    for (let i = 0; i < numLinks; i++) {
      const user = shuffledUsers[i];

      await prisma.userDevice.create({
        data: {
          userId: user.id,
          deviceId: device.id,
        },
      });
    }
  }

  console.log("Popunjena baza");
}

main()
  .catch((err) => {
    console.error("Greska kod popunjavanja", err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

import { PrismaClient } from "@prisma/client";
import express from "express";

const app = express();

app.use(express.json());

const prisma = new PrismaClient();

app.post("/method", async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).send("Missing name");
  }

  if (!description) {
    return res.status(400).send("Missing description");
  }

  const method = await prisma.method.create({
    data: {
      name,
      description,
    },
  });

  res.send(method);
});

app.get("/method", async (req, res) => {
  const method = await prisma.method.findMany();

  res.send(method);
});

app.post("/tip", async (req, res) => {
  const { description, methodId, result, date } = req.body;

  if (!description) {
    return res.status(400).send("Missing description");
  }

  if (!methodId) {
    return res.status(400).send("Missing methodId");
  }

  const tip = await prisma.tip.create({
    data: {
      description,
      methodId,
      result,
      date,
    },
  });

  res.send(tip);
});

app.get("/tip", async (req, res) => {
  const tip = await prisma.tip.findMany();

  res.send(tip);
});

app.listen(3001);
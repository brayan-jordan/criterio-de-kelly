import { PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

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
  const { filterByName, filterByDescription } = req.query;

  const methods = await prisma.method.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      name: {
        contains: filterByName as string,
      },
      description: {
        contains: filterByDescription as string,
      },
    },
  });

  res.send(methods);
});

app.post("/tip", async (req, res) => {
  const { description, methodId, result, date, odd } = req.body;

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
      odd,
    },
    select: {
      id: true,
      date: true,
      description: true,
      result: true,
      odd: true,
      method: true,
      methodId: false,
      createdAt: false,
    },
  });

  res.send(tip);
});

app.get("/tip", async (req, res) => {
  const tip = await prisma.tip.findMany({
    select: {
      id: true,
      date: true,
      description: true,
      result: true,
      odd: true,
      method: true,
      methodId: false,
      createdAt: false,
    },
  });

  res.send(tip);
});

app.listen(3001);

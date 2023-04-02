import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Handle any GET requests
    const prisma = new PrismaClient();
    const users = await prisma.users.findMany();
    res.status(200).json(users);
  } else {
    // 从body中获取json数据
    const { name, email } = req.body;
    const prisma = new PrismaClient();
    const user = await prisma.users.create({
      data: {
        name,
        email,
      },
    });
    res.status(200).json(user);
  }
}

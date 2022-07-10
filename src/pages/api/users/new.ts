import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

type UserBody = {
  email: string;
  name: string;
};

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, email }: UserBody = req.body;

    try {
      const newUser = await prisma.user.create({ data: { name, email } });

      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  res.status(405).json({ message: "You are only allowed to use post method" });

  const user = await prisma.user.findUnique({
    where: { id: req.query.id as string },
  });

  res.status(200).json(user);
};

export default getUser;

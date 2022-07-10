import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const getAllUsers = async (_: NextApiRequest, res: NextApiResponse) => {
  const users = await prisma.user.findMany();

  res.status(200).json(users);
};

export default getAllUsers;

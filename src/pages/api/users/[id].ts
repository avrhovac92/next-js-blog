import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await prisma.user.findUnique({
    where: { id: req.query.id as string },
  });

  res.status(200).json(user);
};

export default getUser;

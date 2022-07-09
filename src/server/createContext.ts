// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { NextApiRequest } from "next";
import { verifyJwt } from "../utils/jwt";
import { prisma } from "./db/client";

interface CtxUser {
  id: string;
  email: string;
  name: string;
  iat: string;
  expiry: number;
}

function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;

  if (!token) {
    return null;
  }

  try {
    const verified = verifyJwt<CtxUser>(token);

    return verified;
  } catch (error) {
    return null;
  }
}

export const createContext = ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const user = getUserFromRequest(req);

  return {
    req,
    res,
    prisma,
    user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;

import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import * as trpc from "@trpc/server";
import {
  createUserSchema,
  removeUserSchema,
  requestOtpSchema,
  userListSchema,
  verifyOtpSchema,
} from "../../schema/user.schema";
import { decodeBase64, encodeBase64 } from "../../utils/base64";
import { signJwt } from "../../utils/jwt";
import { sendLoginEmail } from "../../utils/mailer";
import { getBaseUrl } from "../../utils/url";
import { createRouter } from "../createRouter";
import { serialize } from "cookie";

export const userRouter = createRouter()
  .mutation("register", {
    input: createUserSchema,
    resolve: async ({ ctx, input }) => {
      const { email, name } = input;

      try {
        // TODO: validation
        const user = await ctx.prisma.user.create({ data: { email, name } });
        return user;
      } catch (error) {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === "P2002") {
            throw new trpc.TRPCError({
              code: "CONFLICT",
              message: "User already exists",
            });
          }
        }

        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  })
  .mutation("login-otp", {
    input: requestOtpSchema,
    resolve: async ({ ctx, input }) => {
      const { email, redirect } = input;
      const user = await ctx.prisma.user.findUnique({ where: { email } });

      if (!user) {
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      const token = await ctx.prisma.loginToken.create({
        data: {
          redirect,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      await sendLoginEmail({
        token: encodeBase64(`${token.id}:${user.email}`),
        email: user.email,
        url: `${getBaseUrl()}${redirect}`,
      });
      // send email to the user

      return true;
    },
  })
  .mutation("remove", {
    input: removeUserSchema,
    resolve: async ({ ctx, input }) => {
      try {
        await ctx.prisma.user.delete({ where: { id: input } });
      } catch (error) {
        // if(error instanceof PrismaClientKnownRequestError){
        // }
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: JSON.stringify(error),
        });
      }
    },
  })
  .query("verify-otp", {
    input: verifyOtpSchema,
    resolve: async ({ ctx, input }) => {
      const [tokenId, userEmail] = decodeBase64(input.hash).split(":");

      const token = await ctx.prisma.loginToken.findFirst({
        where: { id: tokenId, user: { email: userEmail } },
        include: {
          user: true,
        },
      });

      if (!token) {
        throw new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Invalid token",
        });
      }

      const jwt = signJwt({
        email: token.user.email,
        id: token.user.id,
      });

      ctx.res.setHeader("Set-Cookie", serialize("token", jwt, { path: "/" }));

      ctx.prisma.loginToken.delete({ where: { id: tokenId } });

      return {
        redirect: token.redirect,
      };
    },
  })
  .query("me", {
    resolve: ({ ctx }) => ctx.user,
  })
  .query("get-all", {
    output: userListSchema,
    resolve: async ({ ctx }) => {
      const users = await ctx.prisma.user.findMany();

      return users;
    },
  });

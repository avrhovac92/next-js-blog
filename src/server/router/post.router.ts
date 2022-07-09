import { createPostSchema, getPostSchema } from "../../schema/post.schema";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";

export const postRouter = createRouter()
  //   .middleware(async ({ ctx }) => {
  //     if (!ctx.user) {
  //       //throw error
  //     }
  //   })
  .mutation("create", {
    input: createPostSchema,
    resolve: async ({ input, ctx }) => {
      if (!ctx.user) {
        new trpc.TRPCError({
          code: "FORBIDDEN",
          message: "Can not create post while logged out",
        });

        return null;
      }

      const post = await ctx.prisma.post.create({
        data: { ...input, user: { connect: { id: ctx.user.id } } },
      });

      return post;
    },
  })
  .query("get-all", {
    resolve: ({ ctx }) => {
      return ctx.prisma.post.findMany();
    },
  })
  .query("get", {
    input: getPostSchema,
    resolve: ({ input, ctx }) => {
      return ctx.prisma.post.findUnique({ where: { id: input.postId } });
    },
  });

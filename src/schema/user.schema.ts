import z from "zod";

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const userListSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
  })
  .array();

export const removeUserSchema = z.string().uuid();

export type RemoveUserInput = z.TypeOf<typeof removeUserSchema>;

export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default("/"),
});

export type RequestOtpInput = z.TypeOf<typeof requestOtpSchema>;

export const verifyOtpSchema = z.object({
  hash: z.string(),
});

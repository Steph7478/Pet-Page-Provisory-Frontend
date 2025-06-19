import {z} from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  userEmail: z.string().email(),
  password: z.string().min(1),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  userEmail: z.string().email(),
  password: z.string().min(1),
  role: z.enum(["adotante", "anunciante"]),
});

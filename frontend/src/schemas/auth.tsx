import {z} from "zod";

export type LoginSchema = z.infer<typeof loginSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  userEmail: z.string().email(),
  password: z.string().min(6, "Credenciais Inválidas"),
});

export const registerSchema = z.object({
  name: z.string().min(1),
  userEmail: z.string().email(),
  password: z.string().min(6, "A senha precisa no minimo 6 digitos"),
  role: z.enum(["adotante", "anunciante"]),
});

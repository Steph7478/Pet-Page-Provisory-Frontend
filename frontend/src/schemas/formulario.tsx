import {z} from "zod";

export const formulario = z.object({
  email: z.string().email("Email inválido"),
  telefone: z.string().min(8, "Telefone deve ter no mínimo 8 dígitos"),
  motivo: z.string().min(5, "Informe um motivo válido"),
  ambiente: z.enum(["Casa", "Apartamento"]),
  espacoExterno: z.boolean(),
  teveAnimaisAntes: z.boolean(),
  ambienteSeguro: z.boolean(),
  petId: z.string(),
  clientId: z.string(),
});

export type FormSchema = z.infer<typeof formulario>;

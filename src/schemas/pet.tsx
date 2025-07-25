import z from "zod";

export const petSchema = z.object({
  nome: z.string().min(1, "Nome obrigatório"),
  raca: z.string().min(1, "Raça obrigatória"),
  porte: z.enum(["Pequeno", "Médio", "Grande"]),
  idade: z.number().min(0, "Idade inválida"),
  descricao: z.string(),
  localizacao: z.string(),
  fotoUrl: z.string().optional(),
  ownerId: z.string(),
});

export type PetFormSchema = z.infer<typeof petSchema>;

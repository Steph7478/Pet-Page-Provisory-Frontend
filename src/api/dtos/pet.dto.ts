export type PetInfos = {
  petId?: string;
  ownerId: string;
  nome: string;
  raca: string;
  porte: string;
  idade: number;
  descricao: string;
  localizacao: string;
  status?: string;
  fotoUrl?: string;
};

export type RegisterPet = FormData | {
  ownerId: string;
  nome: string;
  raca: string;
  porte: string;
  idade: number;
  descricao: string;
  localizacao: string;
  fotoUrl?: string;
};


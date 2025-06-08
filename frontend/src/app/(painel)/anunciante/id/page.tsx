"use client";

import React from "react";
import AdoptionPanel from "../../painelLayout";
import {Formulário} from "@/types/formulario";

const userId = "yes";

const mockDogs: Formulário[] = [
  {
    petId: "1",
    clientId: "client_001",
    email: "ana.silva@email.com",
    telefone: "11999998888",
    motivo: "Quero um pet para companhia.",
    ambiente: "Casa com quintal grande.",
    espacoExterno: true,
    teveAnimaisAntes: true,
    ambienteSeguro: true,
  },
  {
    petId: "2",
    clientId: "client_002",
    email: "bruno.martins@email.com",
    telefone: null,
    motivo: "Sempre quis adotar um gato.",
    ambiente: "Apartamento pequeno, sem varanda.",
    espacoExterno: false,
    teveAnimaisAntes: false,
    ambienteSeguro: true,
  },
  {
    petId: "3",
    clientId: "client_003",
    email: "carla.oliveira@email.com",
    telefone: "21987654321",
    motivo: "Moro sozinho e quero um cão para companhia.",
    ambiente: "Apartamento com varanda ampla.",
    espacoExterno: true,
    teveAnimaisAntes: undefined,
    ambienteSeguro: undefined,
  },
  {
    petId: "4",
    clientId: "client_004",
    email: "daniel.souza@email.com",
    telefone: "31912345678",
    motivo: "Quero dar um lar a um pet resgatado.",
    ambiente: "Casa com jardim médio e muros altos.",
    espacoExterno: true,
    teveAnimaisAntes: true,
    ambienteSeguro: true,
  },
  {
    petId: "5",
    clientId: "client_005",
    email: "elisa.ferreira@email.com",
    telefone: null,
    motivo: "Meus filhos querem um animal de estimação.",
    ambiente: "Apartamento térreo com acesso ao jardim comum.",
    espacoExterno: undefined,
    teveAnimaisAntes: false,
    ambienteSeguro: false,
  },
];

const Adotante = () => {
  return (
    <AdoptionPanel type="advertiser" formulario={mockDogs} userId={userId} />
  );
};

export default Adotante;

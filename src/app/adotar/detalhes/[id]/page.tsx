"use client";

import Modal from "@/components/Detalhes/formulario";
import Button from "@/ui/button";
import Image from "next/image";
import React, {useState} from "react";
import ProtectedRoute from "@/common/routes/ProtectedRoute";
import {useRouteParam} from "@/hooks/routes/useRouteParams";
import {isValidUrl} from "@/utils/isValidUrl";
import {motion} from "framer-motion";
import {fadeIn} from "@/ui/motionVariants";
import {usePetById} from "@/api/services/pet/usePetInfo";

const Detalhes = () => {
  const petId = useRouteParam("id");

  const {data: pet, isLoading, error} = usePetById(petId);

  const [isOpen, setIsOpen] = useState(false);

  const span = (title: string, text: string | number) => (
    <p>
      <span className="font-semibold text-[var(--brown)]">{title}</span> {text}
    </p>
  );

  return (
    <ProtectedRoute>
      <div className="bg-[var(--light-brown)] flex justify-center items-center min-h-screen px-2 pb-10 pt-24">
        <div className="max-w-[800px] w-full h-full flex justify-center items-center">
          <motion.div
            variants={fadeIn}
            initial="initial"
            animate="animate"
            className="w-full bg-[var(--light-yellow)] max-[800px]:max-w-[400px] max-[800px]:flex-col flex rounded-lg overflow-x-hidden"
          >
            <div className="w-full min-[800px]:w-[40%] max-[800px]:h-[400px]  md:h-auto relative">
              <Image
                src={
                  pet?.fotoUrl && isValidUrl(pet.fotoUrl)
                    ? pet.fotoUrl
                    : "/defaultdog.png"
                }
                alt={`Foto do ${pet ? pet.nome : "pet"}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-[var(--light-brown)] flex justify-between py-6 gap-2 min-[800px]:w-[60%] items-center flex-col">
              <h2 className="text-4xl text-[var(--dark-yellow)]">
                {pet ? pet.nome : "pet"}
              </h2>
              <div className="flex flex-col justify-center items-start gap-2 w-[70%]">
                <div className="text-[var(--brown)] text-2xl font-bold">
                  {isLoading && <p>Carregando...</p>}
                  {error && <p>Erro ao carregar dados do pet.</p>}
                  {!isLoading && !error && !pet && <p>Pet não encontrado.</p>}
                </div>
                {!isLoading && !error && pet && (
                  <>
                    {span("Raça", pet.raca)}
                    {span("Idade", pet.idade)}
                    {span("Porte", pet.porte)}
                    {span("Localização:", pet.localizacao)}
                    {span("Descrição", pet.descricao)}
                  </>
                )}
              </div>
              <Button
                onClick={() => setIsOpen(true)}
                className="mt-5"
                intent={"fourth"}
              >
                Iniciar adoção
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
      {isOpen && <Modal setIsOpen={setIsOpen} />}
    </ProtectedRoute>
  );
};

export default Detalhes;

"use client";
import {PetInfos} from "@/api/dtos/pet.dto";
import {usePetInfo} from "@/api/services/pet/usePetInfo";
import {useFadeIn} from "@/hooks/ui/useFadeIn";
import Button from "@/ui/button";
import {isValidUrl} from "@/utils/isValidUrl";
import {motion} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurPets = () => {
  const {data: pets, isLoading, isError} = usePetInfo();

  const fadeIn = [useFadeIn(), useFadeIn(), useFadeIn(), useFadeIn()];

  const petIntents: ("fourth" | "secondVar" | "third")[] = [
    "fourth",
    "secondVar",
    "third",
  ];

  const bgColors = [
    "bg-[var(--dark-yellow)]",
    "bg-[var(--brown)]",
    "bg-[var(--dark-yellow)]",
  ];

  const limitedPets = pets?.slice(0, 3) ?? [];

  return (
    <section className="items-center py-10 flex justify-center min-h-screen w-full bg-[var(--yellow)]">
      <div className="max-w-[1200px] w-full gap-y-10 flex-col min-h-screen flex justify-evenly items-center relative">
        <motion.h2
          ref={fadeIn[0].ref}
          {...fadeIn[0].animationProps}
          className="max-[400px]:text-wrap text-center max-[500px]:text-5xl max-[600px]:text-6xl min-[600px]:text-7xl font-extrabold text-nowrap tracking-wide text-[var(--brown)]"
        >
          Nossos Pets
        </motion.h2>

        <div className="flex gap-6 flex-wrap justify-center items-center">
          {limitedPets.map((pet: PetInfos, idx: number) => {
            const fade = fadeIn[idx + 1] ?? fadeIn[0];
            const name =
              pet?.nome ??
              (isLoading
                ? "Carregando..."
                : isError
                ? "Erro ao carregar"
                : "Sem nome");
            const imageUrl = isValidUrl(pet.fotoUrl) ? pet.fotoUrl : "";

            return (
              <motion.div
                key={pet.petId}
                ref={fade.ref}
                {...fade.animationProps}
                className="flex justify-center items-center flex-col gap-6"
              >
                <div
                  className={`${
                    bgColors[idx % bgColors.length]
                  } rounded-full items-center justify-center flex flex-col gap-y-5 w-[250px] h-[250px] overflow-hidden`}
                >
                  {isLoading ? (
                    <p>Carregando...</p>
                  ) : !imageUrl ? (
                    <p>Erro ao carregar a foto</p>
                  ) : (
                    <Image
                      src={imageUrl}
                      width={800}
                      height={800}
                      className="w-full h-full object-cover rounded-full"
                      alt={name}
                    />
                  )}
                </div>
                {pet?.petId && (
                  <Link href={`/adotar/detalhes/${pet.petId}`}>
                    <Button intent={petIntents[idx % petIntents.length]}>
                      {name}
                    </Button>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurPets;

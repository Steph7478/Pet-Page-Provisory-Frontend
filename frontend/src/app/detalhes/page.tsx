"use client";
import Button from "@/ui/button";
import Image from "next/image";
import React from "react";

const Detalhes = () => {
  const span = (title: string, text: string | number) => (
    <p>
      <span className="font-semibold text-[var(--brown)]">{title}</span> {text}
    </p>
  );

  return (
    <div className="bg-[var(--light-brown)] flex justify-center items-center min-h-screen px-2">
      <div className="max-w-[800px] w-full h-full flex justify-center items-center">
        <div className="w-full bg-[var(--light-yellow)] max-[800px]:max-w-[400px] max-[800px]:flex-col flex rounded-lg overflow-x-hidden">
          <div className="w-full min-[800px]:w-[40%] max-[800px]:h-[400px]  md:h-auto relative">
            <Image
              src="/defaultdog.png"
              alt="Foto do cachorro"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-[var(--light-brown)] flex justify-between py-6 gap-2 min-[800px]:w-[60%] items-center flex-col">
            <h2 className="text-4xl text-[var(--dark-yellow)]">Kiwi</h2>
            <div className="flex flex-col justify-center items-start gap-2 w-[70%]">
              {span("Raça", "raca")}
              {span("Idade", "10 anos")}
              {span(" Localização:", "São Paulo")}
              {span(
                "Descrição",
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Error, temporibus ex saepe placeat distinctio deleniti laboriosam fugalaudantium maxime quidem tenetur eos nulla soluta debitis animi obcaecati ratione accusamus quo!"
              )}
            </div>
            <Button className="mt-5" intent={"fourth"}>
              Iniciar adoção
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detalhes;

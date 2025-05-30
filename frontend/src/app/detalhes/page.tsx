"use client";
import Button from "@/ui/button";
import Image from "next/image";
import React from "react";

const Detalhes = () => {
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
              <p>
                <span className="font-semibold text-[var(--brown)]">Raça:</span>{" "}
                raça
              </p>
              <p>
                <span className="font-semibold text-[var(--brown)]">
                  Idade:
                </span>{" "}
                10
              </p>
              <p>
                <span className="font-semibold text-[var(--brown)]">
                  Localização:
                </span>{" "}
                São Paulo
              </p>
              <p>
                <span className="font-semibold text-[var(--brown)]">
                  Descrição
                </span>{" "}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
                temporibus ex saepe placeat distinctio deleniti laboriosam fuga
                laudantium maxime quidem tenetur eos nulla soluta debitis animi
                obcaecati ratione accusamus quo!
              </p>
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

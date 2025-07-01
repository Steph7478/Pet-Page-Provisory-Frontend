"use client";
import {useFadeIn} from "@/hooks/ui/useFadeIn";
import Typewriter from "@/hooks/ui/useTyping";
import {motion} from "framer-motion";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

const SobreNos = () => {
  const fadeIn = [
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
  ];

  const sobre = (
    name: string[],
    title: string,
    image: string | StaticImport,
    text: string,
    f: number,
    s: number,
    t: number
  ) => (
    <section className=" flex gap-8 justify-center items-center flex-col">
      <div className="flex justify-center items-center w-full gap-6 max-w-[800px] max-[795px]:flex-col max-[795px]: text-center min-[795px]:text-start px-4">
        <div className="flex flex-col gap-8 justify-center items-center">
          <motion.h2
            className=" max-[400px]:text-wrap text-center text-4xl  font-extrabold text-nowrap tracking-wide text-[var(--brown)]"
            ref={fadeIn[f].ref}
            {...fadeIn[f].animationProps}
          >
            {title}
          </motion.h2>
          <motion.div
            className="border-2 shrink-0 border-[var(--brown)] w-[250px] h-[250px] rounded-full overflow-hidden flex justify-center items-center"
            ref={fadeIn[s].ref}
            {...fadeIn[s].animationProps}
          >
            <Image
              src={image}
              alt={title}
              width={250}
              height={250}
              layout="responsive"
            />
          </motion.div>
        </div>
        <motion.div
          className="flex flex-col gap-5"
          ref={fadeIn[t].ref}
          {...fadeIn[t].animationProps}
        >
          <Typewriter
            className="max-[750px]:min-h-18 text-[var(--brown)] text-2xl font-bold flex max-[750px]:justify-center items-center"
            tag="h3"
            phrases={name}
          />
          <div className="max-w-[500px]">
            {text.split("<br>").map((linha, idx) => (
              <p key={idx}>{linha}</p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-[var(--light-yellow)] text-[var(--brown)] py-[100px]">
      <div className="max-w-[800px] w-full flex justify-center items-center flex-col overflow-hidden py-[50px] gap-20 overflow-x-hidden">
        {sobre(
          [
            `Olá, sou o <span class="text-green-500">Oelinton</span>`,
            `Sou desenvolvedor <span class="text-red-500">Frontend.</span>`,
          ],
          "",
          "/",
          "",
          0,
          1,
          2
        )}

        {sobre(
          [
            `Ola! Eu sou a <span class="text-green-500">Stephanie Gurgel.</span>`,
            `Sou desenvolvedora <span class="text-red-500">Fullstack.</span>`,
          ],
          "Fullstack",
          "/Steph.png",
          "Desenvolvedora Fullstack com foco em performance, acessibilidade e escalabilidade. Utilizo React, Next.js, Tailwind CSS e TypeScript como stack principal. Tenho experiência sólida no consumo de APIs REST, gerenciamento de estado e cache com React Query, e construção de componentes reutilizáveis com atenção a boas práticas de UI/UX. Priorizo código limpo, modular e de fácil manutenção, com atenção especial à estrutura, responsividade e experiência do usuário.",
          3,
          4,
          5
        )}
      </div>
    </div>
  );
};

export default SobreNos;

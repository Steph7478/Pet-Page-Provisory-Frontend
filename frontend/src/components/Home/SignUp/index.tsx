"use client";
import {useFadeIn} from "@/hooks/ui/useFadeIn";
import Button from "@/ui/button";
import Input from "@/ui/input";
import {motion} from "framer-motion";
import Image from "next/image";
import React from "react";
import {FcGoogle} from "react-icons/fc";

const SignUp = () => {
  const fadeIn = [
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
    useFadeIn(),
  ];

  const input = (
    n: number,
    intent: "first",
    placeholder: string,
    type: string
  ) => {
    return (
      <Input
        ref={fadeIn[n].ref}
        {...fadeIn[n].animationProps}
        intent={intent}
        placeholder={placeholder}
        type={type}
      />
    );
  };
  return (
    <section className="items-center flex justify-center min-h-screen w-full bg-[var(--brown)] px-4">
      <div className="max-w-[1200px] flex w-full min-h-screen min-[1050px]:justify-center items-center relative max-[1050px]:justify-between max-[1050px] max-[1050px]:flex-col">
        <div className="flex max-w-[400px] items-center justify-center">
          <div className="flex flex-col w-full max-[1050px]:items-center min-[1050px]:items-start justify-center max-[1050px]:text-center gap-y-8">
            <motion.h2
              ref={fadeIn[0].ref}
              {...fadeIn[0].animationProps}
              className="max-[1050px]:mt-32 max-[400px]:text-4xl min-[400px]:text-6xl font-extrabold text-center text-[var(--light-yellow)]"
            >
              Interested?
            </motion.h2>
            <motion.h3
              ref={fadeIn[1].ref}
              {...fadeIn[1].animationProps}
              className="font-bold text-2xl text-[var(--light-yellow)]/75"
            >
              Sign Up!
            </motion.h3>
            <motion.p
              ref={fadeIn[2].ref}
              {...fadeIn[2].animationProps}
              className="max-w-[300px] w-full"
            >
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, quasi autem? Eveniet delectus exercitationem vel
              veritatis maiores a, qui architecto sequi perferendis quasi quam
              ratione magni eum excepturi sit ullam.
            </motion.p>
          </div>
        </div>

        <div
          className="flex max-[1050px]:w-auto min-[1050px]:w-[50%]  
        items-center h-full justify-center"
        >
          <div className="flex justify-center relative items-center w-full flex-col min-h-[650px]">
            <div className="w-full h-[620px] flex justify-center items-center p-16 absolute translate-y-2">
              <Image
                width={700}
                height={800}
                alt=""
                className="object-cover overflow-visible w-full h-full"
                src="/whitefloor.png"
              />
            </div>
            <div className="z-20 w-full h-full flex flex-col gap-y-6 justify-center items-center ">
              {input(3, "first", "NAME", "text")}
              {input(4, "first", "EMAIL", "text")}
              {input(5, "first", "PASSWORD", "text")}
              <motion.p
                ref={fadeIn[6].ref}
                {...fadeIn[6].animationProps}
                className="font-semibold text-[var(--brown)]"
              >
                Or
              </motion.p>
              <Button
                ref={fadeIn[7].ref}
                {...fadeIn[7].animationProps}
                intent={"secondVar"}
                className="flex gap-3 justify-center items-center"
              >
                <FcGoogle className="w-6 h-6" />
                Sign up with Google
              </Button>
              <motion.p
                ref={fadeIn[8].ref}
                {...fadeIn[8].animationProps}
                className="text-[var(--brown)] text-xl underline cursor-pointer hover:brightness-125 font-bold"
              >
                Submit
              </motion.p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

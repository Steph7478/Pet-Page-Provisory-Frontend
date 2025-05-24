import React from "react";
import Button from "@/ui/button";
import Image from "next/image";

const Adoption = () => {
  return (
    <section className="items-center flex relative justify-center min-h-screen w-full bg-[var(--dark-yellow)] px-4">
      <div className="w-fit h-[300px] absolute top-0 right-0 -translate-y-[50%]">
        <Image
          src="/bone.png"
          width={800}
          height={800}
          alt=""
          className="object-contain w-full h-full"
        />
      </div>
      <div className="max-w-[1200px] w-full min-h-screen flex justify-start items-center relative">
        <div className="max-w-full w-[400px] absolute h-auto right-0 translate-x-[10%] bottom-0 mb-5">
          <Image
            src="/sofa.png"
            width={1200}
            height={800}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col max-w-[800px] w-full h-full max-[820px]:-translate-y-1/6 items-center">
          <div className="flex flex-col justify-center gap-y-20 h-full w-full">
            <h2 className=" max-[600px]:text-4xl min-[600px]:text-5xl font-extrabold text-[var(--yellow)]">
              Be an angel for pets
            </h2>
            <p className="min-[820px]:w-[75%] max-[820px]:w-full text-white/75">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit harum dolorum asperiores qui fugiat amet, soluta
              odio neque quia eligendi aperiam dignissimos natus nihil, modi
              doloremque deleniti? Blanditiis, temporibus ipsa?
            </p>
            <div className="flex gap-6">
              <Button intent={"first"} className="w-[100px]">
                Adopt
              </Button>
              <Button
                intent={"second"}
                className="w-[100px] max-[440px]:ml-auto"
              >
                Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adoption;

import Button from "@/ui/button";
import Image from "next/image";
import React from "react";

const OurPets = () => {
  const pets = (
    classname: string,
    intent: "first" | "second" | "third" | "fourth" | "secondVar",
    name?: string,
    picture?: string
  ) => {
    return (
      <>
        <div className="flex justify-center items-center flex-col gap-6">
          <div
            className={`${classname} rounded-full items-center justify-center flex flex-col gap-y-5 w-[250px] h-[250px]`}
          >
            <Image
              src={picture ?? "/bone.png"}
              width={800}
              height={800}
              className="w-full h-full"
              alt=""
            />
          </div>
          <Button intent={intent}>{name ?? "pet"}</Button>
        </div>
      </>
    );
  };
  return (
    <section className="items-center py-10 flex justify-center min-h-screen w-full bg-[var(--yellow)]">
      <div className="max-w-[1200px] w-full gap-y-10 flex-col min-h-screen flex justify-evenly items-center relative">
        <h2 className=" max-[400px]:text-wrap text-center max-[500px]:text-5xl max-[600px]:text-6xl min-[600px]:text-7xl font-extrabold text-nowrap tracking-wide text-[var(--brown)]">
          Our Pets
        </h2>
        <div className="flex gap-6 flex-wrap justify-center items-center">
          {pets("bg-[var(--dark-yellow)]", "fourth")}
          {pets("bg-[var(--brown)]", "secondVar")}
          {pets("bg-[var(--dark-yellow)]", "third")}
        </div>
      </div>
    </section>
  );
};

export default OurPets;

import Input from "@/ui/input";
import Image from "next/image";
import React from "react";

const SignUp = () => {
  const input = (intent: "first", placeholder: string, type: string) => {
    return <Input intent={intent} placeholder={placeholder} type={type} />;
  };
  return (
    <section className="items-center flex justify-center min-h-screen w-full bg-[var(--brown)] px-4">
      <div className="max-w-[1200px] flex w-full min-h-screen min-[1050px]:justify-center items-center relative max-[1050px]:justify-between max-[1050px] max-[1050px]:flex-col">
        <div className="flex max-w-[400px] items-center justify-center">
          <div className="flex flex-col w-full max-[1050px]:items-center min-[1050px]:items-start justify-center max-[1050px]:text-center gap-y-8">
            <h2 className="max-[1050px]:mt-32 max-[400px]:text-4xl min-[400px]:text-6xl font-extrabold text-center text-[var(--light-yellow)]">
              Interested?
            </h2>
            <h3 className="font-bold text-2xl text-[var(--light-yellow)]/75">
              Sign Up!
            </h3>
            <p className="max-w-[300px] w-full">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Accusamus, quasi autem? Eveniet delectus exercitationem vel
              veritatis maiores a, qui architecto sequi perferendis quasi quam
              ratione magni eum excepturi sit ullam.
            </p>
          </div>
        </div>

        <div
          className="flex w-[50%]  
        items-center h-full max-[1050px]:justify-center min-[1050px]:justify-start relative"
        >
          <div className="w-full h-[600px] flex justify-center items-center p-16 absolute translate-y-2 min-[1050px]:-left-[10%]">
            <Image
              width={700}
              height={800}
              alt=""
              className="object-cover overflow-visible w-full h-full"
              src="/whitefloor.png"
            />
          </div>
          <div className="flex z-20 w-[75%] justify-center items-center flex-col gap-y-8 min-h-[650px]">
            {input("first", "NAME", "text")}
            {input("first", "SURNAME", "text")}
            {input("first", "CITY", "text")}
            {input("first", "PHONE NUMBER", "text")}

            <p className="text-[var(--brown)] text-xl underline cursor-pointer hover:brightness-125 font-bold">
              Submit
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

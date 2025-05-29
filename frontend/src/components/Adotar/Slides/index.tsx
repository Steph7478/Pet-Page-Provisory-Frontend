"use client";
import Image from "next/image";
import Button from "@/ui/button";

export default function SimpleSlider() {
  const sliderstest = [
    {name: "test 1", description: "raca", age: 10, img: "/defaultdog.png"},
    {name: "test 2", description: "raca", age: 10, img: "/defaultdog.png"},
    {name: "test 3", description: "raca", age: 10, img: "/defaultdog.png"},
    {name: "test 4", description: "raca", age: 10, img: "/defaultdog.png"},
  ];

  return (
    <div className="w-full max-w-[1000px] max-h-[500px] py-20 max-[800px]:px-2 flex justify-center items-center">
      <div className="  overflow-y-auto h-full flex justify-center scroll-container">
        <div className="flex flex-wrap gap-5 w-full items-center justify-center">
          {sliderstest.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--light-yellow)] h-[350px] w-[200px] flex flex-col justify-center items-center shadow rounded overflow-hidden"
            >
              <div className="relative  h-[65%] w-full">
                <Image
                  src={item.img ?? "/defaultdog.png"}
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center text-[var(--brown)] flex flex-col gap-y-1 justify-between items-center h-[55%] py-4">
                <h3 className="text-xl text-[var(--dark-yellow)] font-semibold">
                  {item.name}
                </h3>
                <p>Raça: {item.description}</p>
                <p>Idade: {item.age}</p>
                <Button intent="fourth" className="text-sm font-bold">
                  Ver detalhes
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

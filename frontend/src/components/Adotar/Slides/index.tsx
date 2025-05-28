"use client";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Button from "@/ui/button";

const Slider = dynamic(() => import("react-slick"), {ssr: false});

export default function SimpleSlider() {
  const sliderstest = [
    {name: "test 1", description: "raca", age: 10, img: "/defaultdog.png"},
    {name: "test 2", description: "raca", age: 10, img: "/defaultdog.png"},
    {name: "test 3", description: "raca", age: 10, img: "/defaultdog.png"},
    {name: "test 4", description: "raca", age: 10, img: "/defaultdog.png"},
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1250,
        settings: {slidesToShow: 3, slidesToScroll: 3},
      },
      {
        breakpoint: 730,
        settings: {slidesToShow: 2, slidesToScroll: 2},
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full overflow-hidden p-20 max-[800px]:px-2 relative">
      <div className="mx-auto max-w-[1000px] drop-shadow-2xl drop-shadow-black/25">
        <Slider {...settings}>
          {sliderstest.map((item, index) => (
            <div key={index} className="px-1">
              <div className="bg-white h-[400px] flex flex-col justify-center items-center shadow rounded overflow-hidden ">
                <div className="relative w-full h-[60%]">
                  <Image
                    src={item.img ?? "/defaultdog.png"}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="text-center text-[var(--brown)] flex flex-col gap-y-1 justify-between items-center h-[40%] py-4">
                  <h3 className="text-xl text-[var(--dark-yellow)] font-semibold">
                    {item.name}
                  </h3>
                  <p>Raça: {item.description}</p>
                  <p>Idade: {item.age}</p>
                  <Button intent="first" className="text-sm font-bold">
                    Ver detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

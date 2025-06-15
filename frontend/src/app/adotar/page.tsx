"use client";
import SimpleSlider from "@/components/Adotar/Slides";
import ProtectedRoute from "@/common/routes/ProtectedRoute";
import Image from "next/image";
import React from "react";

const Adotar = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex justify-center py-20 flex-col items-center bg-[var(--light-yellow)] ">
        <div className="max-w-[1000px] w-full justify-center flex items-center flex-col relative">
          <h2 className="mb-10 max-[400px]:text-wrap h-[75px] text-center max-[500px]:text-5xl max-[600px]:text-6xl min-[600px]:text-7xl font-extrabold text-nowrap max-[800px]:mb-20 tracking-wide text-[var(--brown)]">
            Seu pet.
          </h2>{" "}
          <div className="relative w-full h-full">
            <SimpleSlider />
            <Image
              src="/lyingcat.png"
              width={200}
              height={200}
              className="w-[200px] h-auto absolute right-0 top-8 -translate-x-[10%] -translate-y-[80%]"
              alt=""
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Adotar;

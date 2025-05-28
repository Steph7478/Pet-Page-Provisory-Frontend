import Sidebar from "@/components/Adotar/Sidebar";
import SimpleSlider from "@/components/Adotar/Slides";
import Image from "next/image";
import React from "react";

const Adotar = () => {
  return (
    <div className="min-h-screen flex justify-center py-20 flex-col items-center relative bg-[var(--light-yellow)]">
      <div className=" max-w-[1000px] w-full relative">
        <h2 className="mb-10 max-[400px]:text-wrap text-center max-[500px]:text-5xl max-[600px]:text-6xl min-[600px]:text-7xl font-extrabold text-nowrap tracking-wide text-[var(--brown)]">
          Our Pets.
        </h2>{" "}
        <Image
          src="/lyingcat.png"
          width={200}
          height={200}
          className="w-[200px] h-auto max-[800px]:hidden absolute right-0 top-0 translate-y-[25%] -translate-x-[10%]"
          alt=""
        />
        <div className="w-full rounded-lg overflow-hidden bg-[var(--light-brown)]/50 h-full flex justify-start ">
          <Sidebar />
          <SimpleSlider />
        </div>
      </div>
    </div>
  );
};

export default Adotar;

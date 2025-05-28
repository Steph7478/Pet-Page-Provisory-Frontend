import Checkbox from "@/ui/checkbox";
import React from "react";

const Sidebar = () => {
  const filter = (category: string, value: string, name: string) => {
    return (
      <Checkbox
        intent="first"
        name={category}
        value={value}
        displayName={name}
      />
    );
  };

  return (
    <div className="bg-[var(--brown)] flex min-w-[200px] flex-col py-4 px-6 gap-6 justify-start max-[800px]:absolute max-[800px]:hidden">
      <h2 className="text-4xl my-4 text-[var(--light-yellow)]">Filtros</h2>
      <div className="flex flex-col gap-2 w-full">
        <p className="font-semibold text-left">Tamanho</p>
        <div className="flex flex-col gap-1 items-start">
          {filter("size", "small", "pequeno")}
          {filter("size", "medium", "medio")}
          {filter("size", "large", "grande")}
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <p className="font-semibold text-left">Idade</p>
        <div className="flex flex-col gap-1 items-start">
          {filter("age", "under1", "menos de 1 ano")}
          {filter("age", "1to5", "entre 1 a 5 anos")}
          {filter("age", "over5", "mais de 5 anos")}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

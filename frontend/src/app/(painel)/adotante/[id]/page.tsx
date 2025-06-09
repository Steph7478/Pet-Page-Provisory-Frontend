"use client";

import React from "react";
import AdoptionPanel from "../../painelLayout";
import {useRouteParam} from "@/hooks/routes/useRouteParams";

const Adotante = () => {
  const userId = useRouteParam("id");
  return <AdoptionPanel type="adopter" userId={userId} />;
};

export default Adotante;

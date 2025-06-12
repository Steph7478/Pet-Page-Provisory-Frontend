"use client";

import React from "react";
import AdoptionPanel from "../../painelLayout";
import {useRouteParam} from "@/hooks/routes/useRouteParams";

const Adotante = () => {
  const userId = useRouteParam("id");
  // const userId = "advertiser-123";
  return <AdoptionPanel type="advertiser" userId={userId} />;
};

export default Adotante;

"use client";

import React from "react";
import {useAuth} from "@/hooks/api/useIsAuth";
import AdoptionPanel from "../painelLayout";
import LoadingSpinner from "@/common/layouts/Loading";

const Adotante = () => {
  const {data: user} = useAuth();
  const type = user.role === "adotante" ? "adopter" : "advertiser";

  if (!user) {
    return <LoadingSpinner />;
  }

  return <AdoptionPanel type={type} userId={user.id} />;
};

export default Adotante;

"use client";

import React from "react";
import {useAuth} from "@/hooks/api/auth/useIsAuth";
import AdoptionPanel from "../painelLayout";
import LoadingSpinner from "@/common/layouts/Loading";

const Adotante = () => {
  const {data: user} = useAuth();

  if (!user) {
    return <LoadingSpinner />;
  }

  return <AdoptionPanel type="adopter" userId={user.id} />;
};

export default Adotante;

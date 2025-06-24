"use client";

import React from "react";
import {useAuth} from "@/api/services/auth/useIsAuth";
import AdoptionPanel from "../painelLayout";
import LoadingSpinner from "@/common/layouts/Loading";

const Adotante = () => {
  const {data: user} = useAuth();

  if (!user) {
    return <LoadingSpinner />;
  }

  return <AdoptionPanel type="advertiser" userId={user.id} />;
};

export default Adotante;

"use client";
import React from "react";
import AuthLayout from "../AuthLayout";
import Input from "@/ui/input";

const SignUp = () => {
  return (
    <AuthLayout type="signup">
      <Input intent={"second"} type="text" placeholder="Nome" />
      <Input intent={"second"} type="text" placeholder="Email" />
      <Input intent={"second"} type="text" placeholder="Senha" />
    </AuthLayout>
  );
};

export default SignUp;

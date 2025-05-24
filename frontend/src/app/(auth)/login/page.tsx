"use client";
import Input from "@/ui/input";
import React from "react";
import AuthLayout from "../AuthLayout";

const Login = () => {
  return (
    <AuthLayout type="login">
      <Input intent={"second"} type="text" placeholder="Email" />
      <Input intent={"second"} type="text" placeholder="Senha" />
    </AuthLayout>
  );
};

export default Login;

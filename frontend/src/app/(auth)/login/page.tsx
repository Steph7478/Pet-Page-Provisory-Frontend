"use client";
import Input from "@/ui/input";
import React, {useState} from "react";
import AuthLayout from "../AuthLayout";

const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleChange =
    (field: keyof typeof login) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setLogin((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <AuthLayout type="login">
      <Input
        intent={"second"}
        value={login.email}
        onChange={handleChange("email")}
        type="email"
        placeholder="Email"
      />
      <Input
        intent={"second"}
        value={login.password}
        onChange={handleChange("password")}
        type="password"
        placeholder="Senha"
      />
    </AuthLayout>
  );
};

export default Login;

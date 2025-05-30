"use client";
import React, {useState} from "react";
import AuthLayout from "../AuthLayout";
import Input from "@/ui/input";

const SignUp = () => {
  const [signUp, setSignUp] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange =
    (field: keyof typeof signUp) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSignUp((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <AuthLayout type="signup">
      <Input
        intent={"second"}
        value={signUp.name}
        onChange={handleChange("name")}
        type="text"
        placeholder="Nome"
      />
      <Input
        intent={"second"}
        value={signUp.email}
        onChange={handleChange("email")}
        type="email"
        placeholder="Email"
      />
      <Input
        intent={"second"}
        value={signUp.password}
        onChange={handleChange("password")}
        type="password"
        placeholder="Senha"
      />
    </AuthLayout>
  );
};

export default SignUp;

import React from "react";
import { LoginForm } from "../components/auth/login-form";

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className=" max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
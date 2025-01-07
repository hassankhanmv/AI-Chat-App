import React from "react";
import { LoginForm } from "../components/auth/login-form";
import { json, useActionData } from "@remix-run/react";

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);

  try {
    const response = await fetch(`http://localhost:5000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      return {
        status: response.status,
        error: await response.json(),
      };
    }

    const data = await response.json();
    console.log(data, " data");
    return json(data, {
      headers: {
        "Set-Cookie": `token=${data.token}; HttpOnly; Path=/`,
      },
    });
  } catch (error) {
    return {
      status: 500,
      error: { message: "Something went wrong while logging in" },
    };
  }
}

export default function Login() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className=" max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}

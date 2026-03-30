"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email")).trim() as string | undefined;
  const password = String(formData.get("password")).trim() as
    | string
    | undefined;

  if (!email || !password) {
    return { error: "Enter your email and password" };
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });

    redirect("/dashboard");
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        return { error: "Incorrect email or password" };
      }

      return { error: "Something went wrong" };
    }

    throw error;
  }
}

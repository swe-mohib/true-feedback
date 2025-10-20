"use client";

import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import loading from "@/../public/loading.gif";
import { useCallback, useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export default function SignInForm() {
  const router = useRouter();
  const params = useParams<{ loginBypass?: string }>();

  const handleLoginBypass = useCallback(async () => {
    const passwordParam = params?.loginBypass;
    if (!passwordParam) return toast("Something went wrong.");
    const password = decodeURIComponent(passwordParam);
    const identifier = "admin@gmail.com";

    const result = await signIn("credentials", {
      redirect: false,
      identifier,
      password,
    });

    if (result?.error) {
      if (result.error === "CredentialsSignin") {
        toast("Incorrect username or password");
      } else {
        const message = result?.error;
        toast(message);
      }
    }
    router.push("/dashboard");
  }, [params, router]);

  useEffect(() => {
    handleLoginBypass();
  }, [handleLoginBypass]);

  const handleHome = () => router.push("/");
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="flex flex-col items-center space-y-3 mt-10">
        <button
          onClick={handleHome}
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600 underline cursor-pointer"
        >
          Home
        </button>
        <h2 className="text-yellow-600 font-medium text-lg">
          Signing you in as dummy user - Google
        </h2>
        <Image src={loading} alt="Loading..." className="w-28 h-auto" />
      </div>
    </div>
  );
}

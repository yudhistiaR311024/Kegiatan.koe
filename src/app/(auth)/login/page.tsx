"use client";

import { useActionState } from "react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { login } from "@/app/action/auth";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import AppLogo from "@/components/Logo";
import LoginForm from "@/components/form/LoginForm";

const LoginPage = () => {
  const [stateForm, formAction, pending] = useActionState(login, undefined);

  return (
    <Card
      className={`${stateForm?.error || (stateForm?.message && "border-red-500")
        } w-full max-w-sm`}
    >
      <CardHeader>
        <CardTitle>
          <AppLogo size='xl' />
        </CardTitle>
        <CardDescription className="text-center font-sans text-sm text-zinc-400">
          Masukkan kredensial Anda di bawah untuk melanjutkan ke dasbor Anda
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm state={stateForm} action={formAction} status={pending} />
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button type="submit" form="login-form" disabled={pending} size="lg" className="w-full font-bold">
          {pending ? (
            <>
              <Spinner />
              Processing...
            </>
          ) : (
            "LOGIN"
          )}
        </Button>
        <CardAction className="text-center w-full">
          Belum memiliki akun?{" "}
          <Link href="/register" className="underline underline-offset-4 hover:text-blue-500">
            Daftar
          </Link>
        </CardAction>
        <CardDescription className="font-sans text-sm text-zinc-400 text-center">
          Kami menjaga keamanan informasi Anda dengan sangat serius.
        </CardDescription>
      </CardFooter>
    </Card >
  );
};

export default LoginPage;

"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { register } from "@/app/action/auth";
import { useActionState } from "react";
import AppLogo from "@/components/Logo";
import FormRegister from "@/components/form/FormRegister";
import Link from "next/link";
import { toast } from "sonner";

const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(register, undefined);

  if (state?.success) {
    toast.success(state.message)
  }

  return (
    <Card className="w-full max-w-sm md:max-w-xl">
      <CardHeader>
        <CardTitle>
          <AppLogo size='xl' />
        </CardTitle>
        <CardDescription className="text-zinc-400 font-sans text-center">
          Daftarkan diri Anda untuk mulai mengakses semua fitur kami
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormRegister state={state} action={formAction} status={pending} />
      </CardContent>
      <CardFooter className="flex-col items-center gap-2">
        <Button
          disabled={pending}
          variant="default"
          className="w-full cursor-pointer font-bold"
          type="submit"
          form="form-register"
          size='lg'
        >
          {pending ? (
            <>
              <Spinner />
              Processing...
            </>
          ) : (
            "DAFTAR"
          )}
        </Button>
        <CardAction className="text-center w-full">
          Sudah memiliki akun?{" "}
          <Link href='/login' className="underline underline-offset-4 hover:text-blue-500">
            Login
          </Link>
        </CardAction>
      </CardFooter>
    </Card>
  );
};

export default RegisterPage;

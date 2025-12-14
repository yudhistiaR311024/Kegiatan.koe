"use client";

import React, { useState, useActionState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner";
import { User, Lock, Eye, EyeOff } from 'lucide-react'
import { login } from "@/app/action/auth";

type LoginData = {
  username: string,
  password: string,
}

const LoginPage = () => {
  const [stateForm, formAction, pending] = useActionState(login, undefined)

  const [loginData, setLoginData] = useState<LoginData>({
    username: "",
    password: "",
  });
  const [visibility, setVisibility] = useState<boolean>(false)

  const handleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className={`${stateForm?.error || stateForm?.message && "border-red-500"} w-full max-w-sm md:max-w-sm lg:max-w-md`}>
      <form method="POST" action={formAction}>
        <CardHeader>
          <CardTitle className="font-bold text-md md:text-lg">Senang Melihat Anda Lagi!</CardTitle>
          <CardDescription className="font-sans text-sm text-zinc-400">Masukkan kredensial Anda di bawah untuk melanjutkan ke dasbor Anda</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 my-2">
          <div>
            <InputGroup>
              <InputGroupInput disabled={pending} onChange={handleChange} id="username" name="username" placeholder="Username" type="text" />
              <InputGroupAddon>
                <User className={stateForm?.error && "text-red-500"} />
              </InputGroupAddon>
            </InputGroup>
            <p className="text-red-500 text-sm h-5">{stateForm?.error?.username || stateForm?.message}</p>
          </div>
          <div>
            <InputGroup>
              <InputGroupInput disabled={pending} onChange={handleChange} id="password" name="password" placeholder="password" type={visibility ? "text" : "password"} />
              <InputGroupAddon>
                <Lock className={stateForm?.error && "text-red-500"} />
              </InputGroupAddon>
              <InputGroupButton onClick={handleVisibility}>
                {visibility ? <Eye /> : <EyeOff />}
              </InputGroupButton>
            </InputGroup>
            <p className="text-red-500 text-sm h-5">{stateForm?.error?.username || stateForm?.message}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" disabled={pending} className="w-full mb-2">
            {pending ? (
              <>
                <Spinner />
                Processing...
              </>
            ) : (
              "Login"
            )}
          </Button>
          <p className="font-sans text-sm text-zinc-400">Kami menjaga keamanan informasi Anda dengan sangat serius.</p>
        </CardFooter>
      </form >
    </Card >
  );
};

export default LoginPage;

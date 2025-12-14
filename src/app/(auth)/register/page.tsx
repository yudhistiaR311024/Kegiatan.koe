"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { register } from "@/app/action/auth";
import { useState, useActionState } from "react";

//ugly
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { User, IdCard, Mail, Lock, Eye, EyeOff } from "lucide-react";

const RegisterPage = () => {
  const [state, formAction, pending] = useActionState(register, undefined);
  const [registerData, setRegisterData] = useState<object>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [visibility, setVisibility] = useState<string | null>(null);

  const handleVisibility = (fiieldName: string) => {
    setVisibility((prev) => (prev === fiieldName ? null : fiieldName));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
      <form action={formAction} method="POST">
        <CardHeader>
          <CardTitle className="font-semibold text-md md:text-xl">
            Buat Akun Baru Anda
          </CardTitle>
          <CardDescription className="text-zinc-400 font-sans">
            Daftarkan diri Anda untuk mulai mengakses semua fitur kami
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mt-4">
            <div>
              <InputGroup>
                <InputGroupInput
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  placeholder="Username"
                />
                <InputGroupAddon>
                  <IdCard />
                </InputGroupAddon>
              </InputGroup>
              <p className="text-xs h-5 text-red-500">
                {state?.error?.username}
              </p>
            </div>
            <div className="flex justify-center items-center gap-2">
              <div>
                <InputGroup>
                  <InputGroupInput
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    placeholder="FirstName"
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                <p className="text-xs h-5 text-red-500">
                  {state?.error?.firstName}
                </p>
              </div>
              <div>
                <InputGroup>
                  <InputGroupInput
                    id="lastName"
                    name="lastName"
                    onChange={handleChange}
                    placeholder="LastName"
                  />
                  <InputGroupAddon>
                    <User />
                  </InputGroupAddon>
                </InputGroup>
                <p className="text-xs h-5 text-red-500">
                  {state?.error?.lastName}
                </p>
              </div>
            </div>
            <div>
              <InputGroup>
                <InputGroupInput
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="Email"
                />
                <InputGroupAddon>
                  <Mail />
                </InputGroupAddon>
              </InputGroup>
              <p className="text-xs h-5 text-red-500">{state?.error?.email}</p>
            </div>
            <div>
              <InputGroup>
                <InputGroupInput
                  id="password"
                  name="password"
                  type={visibility === "password" ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Password"
                />
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupButton
                  size="icon-sm"
                  onClick={() => handleVisibility("password")}
                >
                  {visibility === "password" ? <Eye /> : <EyeOff />}
                </InputGroupButton>
              </InputGroup>
              <p className="text-xs h-5 text-red-500">
                {state?.error?.password}
              </p>
            </div>
            <div>
              <InputGroup>
                <InputGroupInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type={visibility === "confirmPassword" ? "text" : "password"}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                />
                <InputGroupAddon>
                  <Lock />
                </InputGroupAddon>
                <InputGroupButton
                  size="icon-sm"
                  onClick={() => handleVisibility("confirmPassword")}
                >
                  {visibility === "confirmPassword" ? <Eye /> : <EyeOff />}
                </InputGroupButton>
              </InputGroup>
              <p className="text-xs h-5 text-red-500">
                {state?.error?.confirmPassword}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button
            disabled={pending}
            variant="default"
            className="w-full cursor-pointer"
            type="submit"
          >
            {pending ? (
              <>
                <Spinner /> Processing...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterPage;

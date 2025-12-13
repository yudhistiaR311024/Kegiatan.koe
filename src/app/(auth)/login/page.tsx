"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { axiosWithJWT } from "@/lib/axiosInstance";

const LoginPage = () => {
  const [loginData, setLoginData] = useState<object>({
    username: "",
    password: "",
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    return await axiosWithJWT
      .post("/auth/login", loginData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account</CardDescription>
          <CardAction>
            <Link
              href="/register"
              className={buttonVariants({ variant: "link", size: "lg" })}
            >
              Register
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label>Username</Label>
              <Input
                onChange={handleChange}
                name="username"
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Password</Label>
              <Input
                onChange={handleChange}
                name="password"
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Spinner /> Processing...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default LoginPage;

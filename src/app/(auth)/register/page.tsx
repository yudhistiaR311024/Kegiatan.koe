"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { useState } from "react";

import { axiosWithJWT } from "@/lib/axiosInstance";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<object>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await axiosWithJWT
      .post("/auth/register", registerData)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  console.log(registerData);

  return (
    <Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Register to your account</CardDescription>
          <CardAction>
            <Link
              href="/login"
              className={buttonVariants({ variant: "link", size: "lg" })}
            >
              Login
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 mt-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                onChange={handleChange}
                placeholder="Username"
                type="text"
                name="username"
                id="username"
              />
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="flex flex-col flex-wrap gap-2 w-full">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  onChange={handleChange}
                  placeholder="First Name"
                  type="text"
                  name="firstName"
                  id="firstName"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  onChange={handleChange}
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  id="lastName"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                onChange={handleChange}
                placeholder="Email"
                type="email"
                name="email"
                id="email"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                onChange={handleChange}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                onChange={handleChange}
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="mt-4">
          <Button
            disabled={loading}
            variant="default"
            className="w-full cursor-pointer"
            type="submit"
          >
            {loading ? (
              <>
                <Spinner /> Process...
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

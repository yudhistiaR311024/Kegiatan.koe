"use client";
import MainLayout from "@/components/Layouts/MainLayout";
import { axiosWithJWT } from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);

      await axiosWithJWT("/users").then((res) => {
        console.log(res);
      });

      setLoading(false);
    };
    getUsers();
  }, []);

  if (loading) <h1>Loading...</h1>;

  return (
    <MainLayout>
      <div></div>
    </MainLayout>
  );
}

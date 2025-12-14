"use client";

import MainLayout from "@/components/Layouts/MainLayout";
import { logout } from "../action/auth";
import { Button } from "@/components/ui/button";

export default function DahboardPage() {
  return (
    <MainLayout>
      <form action={logout} method="POST">
        <Button type="submit">Logout</Button>
      </form>
    </MainLayout>
  );
}

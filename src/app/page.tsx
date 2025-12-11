import MainLayout from "@/components/Layouts/MainLayout";

export default function Home({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}

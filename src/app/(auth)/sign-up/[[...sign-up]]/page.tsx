import { SignUp } from "@clerk/nextjs";

const RegisterPage = () => {
  return (
    <section className="flex h-dvh w-full items-center justify-center">
      <SignUp />
    </section>
  );
};

export default RegisterPage;

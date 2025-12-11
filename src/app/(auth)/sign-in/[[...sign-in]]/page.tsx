import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <section className="flex h-dvh w-full items-center justify-center">
      <SignIn
        fallbackRedirectUrl="/"
        forceRedirectUrl="/"
        fallback={<p>Loading...</p>}
      />
    </section>
  );
};

export default SignInPage;

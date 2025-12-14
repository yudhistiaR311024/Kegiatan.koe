const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container mx-auto flex h-dvh w-full items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;

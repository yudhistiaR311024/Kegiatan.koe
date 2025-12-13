const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="container mx-auto flex h-lvh w-full items-center justify-center">
      {children}
    </section>
  );
};

export default AuthLayout;

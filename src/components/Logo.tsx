import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const logoSizes = cva(
  "flex items-center justify-center",
  {
    variants: {
      size: {
        default: "text-sm",
        md: "text-base",
        lg: "text-xl",
        xl: "text-3xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type AppLogoProps =
  React.ComponentPropsWithoutRef<"link"> &
  VariantProps<typeof logoSizes>;

const AppLogo = ({ className, size }: AppLogoProps) => {
  return (
    <Link
      href="/dashboard"
      className={cn(logoSizes({ size, className }))}
    >
      <span className="font-bold">Kegiatan</span>
      <span className="text-blue-500 font-semibold">.koe</span>
    </Link>
  );
};

export default AppLogo;

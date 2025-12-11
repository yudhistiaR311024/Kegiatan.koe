import Link from "next/link";

const AppLogo = () => {
  return (
    <Link href="/" className="flex items-center justify-center">
      <span className="font-bold text-xs md:text-lg">Kegiatan</span>
      <span className="text-xs md:text-lg text-blue-500 font-semibold">
        .koe
      </span>
    </Link>
  );
};

export default AppLogo;

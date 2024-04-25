/**
 * Komponen Navbar digunakan untuk menampilkan navigasi utama dan switcher antar toko.
 * Jika pengguna belum masuk, akan diarahkan ke halaman sign-in.
 * @returns {JSX.Element} - Komponen Navbar.
 */

import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "@/components/store-switcher";

const Navbar = async () => {
  const { userId } = auth();

  // Jika pengguna belum masuk, diarahkan ke halaman sign-in
  if (!userId) {
    redirect("/sign-in");
  }

  // Mengambil daftar toko yang dimiliki pengguna
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

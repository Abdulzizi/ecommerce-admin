import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "./main-nav";

import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "@/components/admin/store-switcher";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import Link from "next/link";

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
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

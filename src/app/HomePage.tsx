"use client";

import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import Navbar from "@/Components/Navbar";
import { usePathname } from "next/navigation";
import Loader from "@/Components/Loader";
function HomePage({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const hideNavbarOn = ["/login", "/register"];

  const showNavbar = !hideNavbarOn.includes(pathname);
  const { status } = useSession();
  return (
    <div>
      {status === "loading" ? (
        <div className="flex flex-col justify-center items-center min-h-screen ">
          <Loader loading={true} />
        </div>
      ) : (
        <>
          {showNavbar && <Navbar />}
          <main>{children}</main>
        </>
      )}
    </div>
  );
}

export default HomePage;

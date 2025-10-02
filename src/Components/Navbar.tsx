"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "./Loader";

type link = {
  url: string;
  title: string;
};
const Navbar = () => {
  const links: link[] = [
    {
      url: "/",
      title: "Home",
    },
    {
      title: "Products",
      url: "/products",
    },
    {
      url: "/todos",
      title: "Todos",
    },
    {
      url: "/users",
      title: "Users",
    },
  ];
  const AuthLinks: link[] = [
    {
      url: "/login",
      title: "Login",
    },
    {
      url: "/signup",
      title: "Signup",
    },
  ];
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const { status } = useSession();

  const handleLogout = async () => {
    setLoading(true);
    await signOut({ callbackUrl: "/" });
  };
  if (loading) {
    <div className="flex flex-col justify-center items-center min-h-screen ">
      <Loader loading={true} />
    </div>;
  }
  return (
    <nav className="relative bg-gray-800/50 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
                className="h-8 w-auto"
                width={220}
                height={220}
                priority
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {links.map((navbarLink) => {
                  const isActive = pathname === navbarLink.url;
                  return (
                    <Link
                      className={`rounded-md px-3 py-2 text-sm font-medium text-white ${
                        isActive && "bg-gray-950/50"
                      }`}
                      href={navbarLink.url}
                      key={navbarLink.url}
                    >
                      {navbarLink.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <div>
                {status === "authenticated" ? (
                  <button
                    onClick={handleLogout}
                    className="rounded-md bg-indigo-500 px-4 py-2 text-white font-semibold hover:bg-indigo-400 text-sm"
                  >
                    LogOut
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    {AuthLinks.map((navbarLink) => {
                      const isActive = pathname === navbarLink.url;
                      return (
                        <Link
                          className={`rounded-md px-3 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-400  ${
                            isActive && "bg-indigo-500"
                          }`}
                          href={navbarLink.url}
                          key={navbarLink.url}
                        >
                          {navbarLink.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostData } from "@/store/Api/ReactQuery";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "next-auth";
import toast from "react-hot-toast";

interface userLogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const qc = useQueryClient();

  const addUserMutation = useMutation({
    mutationFn: async (data: userLogin) =>
      PostData<userLogin, User>("http://localhost:3000/api/auth/login", data, {
        method: "POST",
      }),
    onSuccess: () => {
      toast.success("User Added");
      qc.invalidateQueries({ queryKey: ["user"] });
      router.push("/users");
    },
    onError: (err: any) => toast.error(err.message),
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setLoading(false);
    const data = {
      email,
      password,
    };
    addUserMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800/30">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/80 p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        <label className="block mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded mb-6"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

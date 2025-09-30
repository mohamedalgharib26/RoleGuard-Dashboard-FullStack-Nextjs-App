/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loader from "../../Components/Loader";
import { PostData, User } from "../../store/Api/ReactQuery";
import { Prisma, Role, Status } from "@prisma/client";
import { AddNewUserInput, addNewUserSchema } from "@/validation";

interface UserManagementProps {
  editingUserProp?:
    | Prisma.UsersCreateInput
    | Prisma.UsersUpdateInput
    | User
    | null;
  onUpdateComplete?: () => void;
}

const UserManagement = ({
  editingUserProp,
  onUpdateComplete,
}: UserManagementProps) => {
  const qc = useQueryClient();

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddNewUserInput>({
    resolver: zodResolver(addNewUserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
      status: undefined,
    },
  });

  const addUserMutation = useMutation({
    mutationFn: async (data: Prisma.UsersCreateInput) =>
      PostData<Prisma.UsersCreateInput, User>(
        "http://localhost:3000/api/users",
        data,
        { method: "POST" }
      ),
    onSuccess: () => {
      toast.success("User Added");
      qc.invalidateQueries({ queryKey: ["users"] });
      reset();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const updateUserMutation = useMutation({
    mutationFn: async (data: Prisma.UsersUpdateInput) =>
      PostData<Prisma.UsersUpdateInput, User>(
        `http://localhost:3000/api/users/${data.id}`,
        data,
        { method: "PUT" }
      ),
    onSuccess: () => {
      toast.success("User Updated");
      qc.invalidateQueries({ queryKey: ["users"] });
      reset({ name: "", email: "", role: undefined, status: undefined });
      if (onUpdateComplete) onUpdateComplete();
    },
    onError: (err: any) => toast.error(err.message),
  });

  // Load editing user into form
  useEffect(() => {
    if (editingUserProp) {
      reset(editingUserProp as AddNewUserInput);
    } else {
      reset({ name: "", email: "", role: undefined, status: undefined });
    }
  }, [editingUserProp, reset]);

  const onSubmit = (data: AddNewUserInput) => {
    if (editingUserProp) {
      if (!editingUserProp?.id) return;

      const payload: Prisma.UsersUpdateInput = {
        ...data,
        role: data.role ? (data.role as Role) : undefined,
        status: data.status ? (data.status as Status) : undefined,
      };
      updateUserMutation.mutate(payload);
    } else {
      const payload: Prisma.UsersCreateInput = {
        ...data,
        role: data.role ? (data.role as Role) : undefined,
        status: data.status ? (data.status as Status) : undefined,
      };
      addUserMutation.mutate(payload);
    }
  };

  function handleCancel() {
    reset({ name: "", email: "", role: undefined, status: undefined });
    if (onUpdateComplete) onUpdateComplete();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {addUserMutation.isPending || updateUserMutation.isPending ? (
        <Loader loading={true} />
      ) : (
        <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {editingUserProp ? "Edit User" : "Add New User"}
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-black"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  {...register("name")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  type="text"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("email")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  type="email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <select
                  {...register("role")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select a role</option>
                  {Object.values(Role).map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select status</option>
                  {Object.values(Status).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
              >
                {editingUserProp ? "Update User" : "Add User"}
              </button>
              {editingUserProp && (
                <button
                  type="button"
                  onClick={() => {
                    handleCancel();
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;

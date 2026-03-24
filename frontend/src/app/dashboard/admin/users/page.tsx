"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);

      const res = await api.get("/admin/users", {
        params: { page, limit: 20, search },
      });

      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, [page]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Users</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search users..."
            className="px-3 py-2 border rounded-md text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-md" />
          ))}
        </div>
      )}

      {/* Table */}
      {!loading && (
        <div className="rounded-lg bg-white p-4 shadow-sm border border-gray-100">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-gray-500">
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Email</th>
                <th className="py-2 text-center">Role</th>
                <th className="py-2 text-center">Status</th>
                <th className="py-2 text-right">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-gray-400">
                    No users found.
                  </td>
                </tr>
              )}

              {users.map((u) => (
                <tr key={u.id} className="border-b last:border-0">
                  <td className="py-2">{u.name}</td>
                  <td className="py-2">{u.email}</td>
                  <td className="py-2 text-center">
                    <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-700 text-xs">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        u.status === "ACTIVE"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-2 text-right text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded-md disabled:opacity-50"
            >
              Previous
            </button>

            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded-md"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

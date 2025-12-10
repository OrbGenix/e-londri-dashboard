"use client";

import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Eye, EyeOff } from "lucide-react";

import api from "@/utils/api/apiClient";
import { apiLink } from "@/lib/apiList";

const roles = [
  { label: "Super Admin", value: "super_admin" },
  { label: "Admin", value: "admin" },
  { label: "Branch Owner", value: "branch_owner" },
  { label: "Branch Manager", value: "branch_manager" },
  { label: "Employee", value: "employee" },
  { label: "Delivery Man", value: "delivery_man" },
  { label: "Customer", value: "customer" },
];
interface User {
  id?: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  is_verified: boolean;
  profile_picture?: File | null;
  password?: string;
}

export default function UsersPage() {
  const [userList, setUserList] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const filtered = userList.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  /* ---------------------- Fetch Items ---------------------- */
  const fetchItems = useCallback(async () => {
    try {
      const res = await api.get(apiLink.USER);
      setUserList(res.data.results);
    } catch (err) {
      console.error(err);
    }
  }, []);

  /* ---------------------- Add / Edit ---------------------- */
  const handleAddOrEdit = async (user: User) => {
    try {
      if (editingUser?.id) {
        await api.patch(`${apiLink.USER}${editingUser.id}`, user);
        setEditingUser(null);
      } else {
        await api.post(apiLink.USER, user);
      }

      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------------- Delete ---------------------- */
  const deleteUser = async (id: number) => {
    try {
      await api.delete(`${apiLink.USER}${id}`);
      fetchItems();
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------------- Load Data Initially ---------------------- */
  useEffect(() => {
    const load = async () => await fetchItems();
    load();
  }, [fetchItems]);

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Users</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Add User</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>

            <UserForm
              onSubmit={handleAddOrEdit}
              onCancel={() => setEditingUser(null)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <Input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Verified</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((u) => (
              <tr key={u.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone}</td>

                <td className="p-3">
                  <Badge variant="secondary">{u.role}</Badge>
                </td>

                <td className="p-3">
                  <Badge variant={u.is_verified ? "default" : "destructive"}>
                    {u.is_verified ? "Verified" : "Unverified"}
                  </Badge>
                </td>

                {/* ACTIONS */}
                <td className="p-3 flex gap-2">
                  {/* EDIT */}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingUser(u)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>

                      <UserForm
                        user={u}
                        onSubmit={handleAddOrEdit}
                        onCancel={() => setEditingUser(null)}
                      />
                    </DialogContent>
                  </Dialog>

                  {/* DELETE */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteUser(u.id!)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* -------------------------------------------------------------
      USER FORM COMPONENT
------------------------------------------------------------- */
function UserForm({
  user,
  onSubmit,
  onCancel,
}: {
  user?: User;
  onSubmit: (user: User) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [role, setRole] = useState(user?.role ?? "customer");
  const [isVerified, setIsVerified] = useState(user?.is_verified ?? false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handlePictureChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !phone) return;

    onSubmit({
      name,
      email,
      phone,
      role,
      is_verified: isVerified,
      profile_picture: profilePicture ?? undefined,
      password: password || undefined,
    });
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      {/* ROLE */}
      <Select value={role} onValueChange={(val) => setRole(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((r) => (
            <SelectItem key={r.value} value={r.value}>
              {r.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* VERIFIED */}
      <div>
        <label className="mb-1 block">Verified Status</label>
        <Select
          value={isVerified ? "true" : "false"}
          onValueChange={(v) => setIsVerified(v === "true")}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Verified</SelectItem>
            <SelectItem value="false">Unverified</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* PICTURE */}
      <div>
        <label className="block mb-1">Profile Picture</label>
        <input type="file" accept="image/*" onChange={handlePictureChange} />
      </div>

      {/* PASSWORD */}
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Password (optional)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={handleSubmit}>{user ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
}

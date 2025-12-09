"use client";
import { useState } from "react";
import DashboardLayout from "@/app/layout";
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
} from "@/components/ui/select"; // Shadcn UI Select

// Dummy data
const initialUsers = [
  {
    id: 1,
    name: "Talal Mahmud",
    email: "talal@example.com",
    phone: "017XXXXXXX",
    role: "customer",
    status: "active",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    phone: "018XXXXXXX",
    role: "branch",
    status: "banned",
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "019XXXXXXX",
    role: "delivery",
    status: "active",
  },
];

const roles = ["admin", "branch", "delivery", "customer"];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [editingUser, setEditingUser] = useState<any>(null); // For edit form

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleBan = (id: number) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "banned" : "active" }
          : u
      )
    );
  };

  const handleAddOrEdit = (user: any) => {
    if (editingUser) {
      // Edit existing user
      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? { ...user, id: u.id } : u))
      );
      setEditingUser(null);
    } else {
      // Add new user
      setUsers((prev) => [...prev, { ...user, id: prev.length + 1 }]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Users</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>{editingUser ? "Edit User" : "Add User"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingUser ? "Edit User" : "Add New User"}
              </DialogTitle>
            </DialogHeader>
            <UserForm
              user={editingUser}
              onSubmit={(user) => handleAddOrEdit(user)}
              onCancel={() => setEditingUser(null)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{user.id}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">
                  <Badge variant="secondary">{user.role}</Badge>
                </td>
                <td className="p-3">
                  <Badge
                    variant={
                      user.status === "active" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="p-3 flex gap-2">
                  <Button size="sm" onClick={() => toggleBan(user.id)}>
                    {user.status === "active" ? "Ban" : "Unban"}
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingUser(user)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit User</DialogTitle>
                      </DialogHeader>
                      <UserForm
                        user={user}
                        onSubmit={(user) => handleAddOrEdit(user)}
                        onCancel={() => setEditingUser(null)}
                      />
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// --------------------- User Form Component ---------------------
function UserForm({ user, onSubmit, onCancel }: any) {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [role, setRole] = useState(user?.role || "customer");

  const handleSubmit = () => {
    if (!name || !email || !phone || !role) return;
    onSubmit({ name, email, phone, role, status: user?.status || "active" });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
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

      <Select value={role} onValueChange={(val) => setRole(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((r) => (
            <SelectItem key={r} value={r}>
              {r}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>{user ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
}

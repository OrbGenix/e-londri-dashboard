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
} from "@/components/ui/select";

// Dummy data
const initialBranches = [
  {
    id: 1,
    name: "Central Laundry",
    address: "123 Main Street",
    serviceAreas: "Area1, Area2",
    type: "Laundry",
    contact: "017XXXXXXX",
    hours: "9AM - 9PM",
    status: "active",
  },
  {
    id: 2,
    name: "Downtown Dryclean",
    address: "456 Market Road",
    serviceAreas: "Area3, Area4",
    type: "Dry-clean",
    contact: "018XXXXXXX",
    hours: "10AM - 8PM",
    status: "pending",
  },
];

const branchTypes = ["Laundry", "Dry-clean", "Combo"];

export default function BranchesPage() {
  const [branches, setBranches] = useState(initialBranches);
  const [search, setSearch] = useState("");
  const [editingBranch, setEditingBranch] = useState<any>(null);

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this branch?")) {
      setBranches((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const handleAddOrEdit = (branch: any) => {
    if (editingBranch) {
      setBranches((prev) =>
        prev.map((b) =>
          b.id === editingBranch.id ? { ...branch, id: b.id } : b
        )
      );
      setEditingBranch(null);
    } else {
      setBranches((prev) => [...prev, { ...branch, id: prev.length + 1 }]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Branches</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>{editingBranch ? "Edit Branch" : "Add Branch"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingBranch ? "Edit Branch" : "Add New Branch"}
              </DialogTitle>
            </DialogHeader>
            <BranchForm
              branch={editingBranch}
              onSubmit={handleAddOrEdit}
              onCancel={() => setEditingBranch(null)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Search by branch name..."
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
              <th className="p-3">Address</th>
              <th className="p-3">Service Areas</th>
              <th className="p-3">Type</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Hours</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBranches.map((branch) => (
              <tr key={branch.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{branch.id}</td>
                <td className="p-3">{branch.name}</td>
                <td className="p-3">{branch.address}</td>
                <td className="p-3">{branch.serviceAreas}</td>
                <td className="p-3">{branch.type}</td>
                <td className="p-3">{branch.contact}</td>
                <td className="p-3">{branch.hours}</td>
                <td className="p-3">
                  <Badge
                    variant={
                      branch.status === "active"
                        ? "success"
                        : branch.status === "pending"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {branch.status}
                  </Badge>
                </td>
                <td className="p-3 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingBranch(branch)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Branch</DialogTitle>
                      </DialogHeader>
                      <BranchForm
                        branch={branch}
                        onSubmit={handleAddOrEdit}
                        onCancel={() => setEditingBranch(null)}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(branch.id)}
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

// --------------------- Branch Form Component ---------------------
function BranchForm({ branch, onSubmit, onCancel }: any) {
  const [name, setName] = useState(branch?.name || "");
  const [address, setAddress] = useState(branch?.address || "");
  const [serviceAreas, setServiceAreas] = useState(branch?.serviceAreas || "");
  const [type, setType] = useState(branch?.type || "Laundry");
  const [contact, setContact] = useState(branch?.contact || "");
  const [hours, setHours] = useState(branch?.hours || "");
  const [status, setStatus] = useState(branch?.status || "active");

  const handleSubmit = () => {
    if (
      !name ||
      !address ||
      !serviceAreas ||
      !type ||
      !contact ||
      !hours ||
      !status
    )
      return;
    onSubmit({ name, address, serviceAreas, type, contact, hours, status });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Input
        placeholder="Branch Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <Input
        placeholder="Service Areas (comma separated)"
        value={serviceAreas}
        onChange={(e) => setServiceAreas(e.target.value)}
      />
      <Select value={type} onValueChange={(val) => setType(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {branchTypes.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Contact"
        value={contact}
        onChange={(e) => setContact(e.target.value)}
      />
      <Input
        placeholder="Operating Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <Select value={status} onValueChange={(val) => setStatus(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>{branch ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
}

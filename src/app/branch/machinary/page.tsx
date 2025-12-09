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

// Dummy machinery data
const initialMachines = [
  {
    id: 1,
    name: "Washer 1",
    type: "Washer",
    status: "Operational",
    lastMaintenance: "2025-12-01",
    nextMaintenance: "2026-01-01",
    vendor: "ABC Machinery Co.",
  },
  {
    id: 2,
    name: "Dryer 1",
    type: "Dryer",
    status: "Maintenance Required",
    lastMaintenance: "2025-11-15",
    nextMaintenance: "2025-12-15",
    vendor: "XYZ Machines",
  },
];

const machineTypes = [
  "Washer",
  "Dryer",
  "Ironing Machine",
  "Packaging Machine",
];
const machineStatuses = ["Operational", "Maintenance Required", "Out of Order"];

export default function MachineryPage() {
  const [machines, setMachines] = useState(initialMachines);
  const [search, setSearch] = useState("");
  const [editingMachine, setEditingMachine] = useState<any>(null);

  const filteredMachines = machines.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this machine?")) {
      setMachines((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const handleAddOrEdit = (machine: any) => {
    if (editingMachine) {
      setMachines((prev) =>
        prev.map((m) =>
          m.id === editingMachine.id ? { ...machine, id: m.id } : m
        )
      );
      setEditingMachine(null);
    } else {
      setMachines((prev) => [...prev, { ...machine, id: prev.length + 1 }]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Branch Machinery</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>{editingMachine ? "Edit Machine" : "Add Machine"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingMachine ? "Edit Machine" : "Add New Machine"}
              </DialogTitle>
            </DialogHeader>
            <MachineForm
              machine={editingMachine}
              onSubmit={handleAddOrEdit}
              onCancel={() => setEditingMachine(null)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Search by machine name..."
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
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Maintenance</th>
              <th className="p-3">Next Maintenance</th>
              <th className="p-3">Vendor</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMachines.map((machine) => (
              <tr key={machine.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{machine.id}</td>
                <td className="p-3">{machine.name}</td>
                <td className="p-3">{machine.type}</td>
                <td className="p-3">
                  <Badge
                    variant={
                      machine.status === "Operational"
                        ? "success"
                        : machine.status === "Maintenance Required"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {machine.status}
                  </Badge>
                </td>
                <td className="p-3">{machine.lastMaintenance}</td>
                <td className="p-3">{machine.nextMaintenance}</td>
                <td className="p-3">{machine.vendor}</td>
                <td className="p-3 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingMachine(machine)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Machine</DialogTitle>
                      </DialogHeader>
                      <MachineForm
                        machine={machine}
                        onSubmit={handleAddOrEdit}
                        onCancel={() => setEditingMachine(null)}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(machine.id)}
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

// ---------------- Machine Form Component ----------------
function MachineForm({ machine, onSubmit, onCancel }: any) {
  const [name, setName] = useState(machine?.name || "");
  const [type, setType] = useState(machine?.type || "Washer");
  const [status, setStatus] = useState(machine?.status || "Operational");
  const [lastMaintenance, setLastMaintenance] = useState(
    machine?.lastMaintenance || ""
  );
  const [nextMaintenance, setNextMaintenance] = useState(
    machine?.nextMaintenance || ""
  );
  const [vendor, setVendor] = useState(machine?.vendor || "");

  const handleSubmit = () => {
    if (
      !name ||
      !type ||
      !status ||
      !lastMaintenance ||
      !nextMaintenance ||
      !vendor
    )
      return;
    onSubmit({ name, type, status, lastMaintenance, nextMaintenance, vendor });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Input
        placeholder="Machine Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select value={type} onValueChange={(val) => setType(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Type" />
        </SelectTrigger>
        <SelectContent>
          {machineTypes.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={status} onValueChange={(val) => setStatus(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          {machineStatuses.map((s) => (
            <SelectItem key={s} value={s}>
              {s}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Last Maintenance (YYYY-MM-DD)"
        value={lastMaintenance}
        onChange={(e) => setLastMaintenance(e.target.value)}
      />
      <Input
        placeholder="Next Maintenance (YYYY-MM-DD)"
        value={nextMaintenance}
        onChange={(e) => setNextMaintenance(e.target.value)}
      />
      <Input
        placeholder="Vendor"
        value={vendor}
        onChange={(e) => setVendor(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>{machine ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
}

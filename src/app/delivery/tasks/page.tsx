"use client";
import { useState } from "react";
import DashboardLayout from "@/app/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Dummy delivery tasks
const initialTasks = [
  {
    id: 1,
    customer: "Talal Mahmud",
    type: "Pick & Drop",
    deliveryMan: "Not Assigned",
    status: "Assigned",
    date: "2025-12-08",
  },
  {
    id: 2,
    customer: "Jane Smith",
    type: "Pick Only",
    deliveryMan: "Ali",
    status: "Picked",
    date: "2025-12-08",
  },
  {
    id: 3,
    customer: "John Doe",
    type: "Drop Only",
    deliveryMan: "Rahim",
    status: "Assigned",
    date: "2025-12-08",
  },
];

const taskStatuses = ["Assigned", "Picked", "Delivered", "Unable"];

export default function DeliveryTaskPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [search, setSearch] = useState("");

  const filteredTasks = tasks.filter(
    (t) =>
      t.customer.toLowerCase().includes(search.toLowerCase()) ||
      t.deliveryMan.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: number, status: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const assignDeliveryMan = (id: number) => {
    const name = prompt("Enter delivery man name:");
    if (name) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, deliveryMan: name } : t))
      );
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Delivery Tasks</h1>
        <Input
          placeholder="Search by customer or delivery man..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Task Type</th>
              <th className="p-3">Delivery Man</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{task.id}</td>
                <td className="p-3">{task.customer}</td>
                <td className="p-3">{task.type}</td>
                <td className="p-3">{task.deliveryMan}</td>
                <td className="p-3">
                  <Badge
                    variant={
                      task.status === "Delivered"
                        ? "success"
                        : task.status === "Picked"
                        ? "default"
                        : task.status === "Assigned"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="p-3">{task.date}</td>
                <td className="p-3 flex flex-col gap-2">
                  <Button size="sm" onClick={() => assignDeliveryMan(task.id)}>
                    Assign Delivery Man
                  </Button>

                  <Select
                    value={task.status}
                    onValueChange={(val) => updateStatus(task.id, val)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {taskStatuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

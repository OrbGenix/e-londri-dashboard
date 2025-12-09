"use client";
import { useState } from "react";
import DashboardLayout from "@/app/layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

// Dummy data for branch orders
const initialBranchOrders = [
  {
    id: 1,
    customer: "Talal Mahmud",
    items: "Shirt x2, Pants x1",
    type: "Wash",
    status: "Booked",
    pickAssigned: "Not Assigned",
    dropAssigned: "Not Assigned",
  },
  {
    id: 2,
    customer: "Jane Smith",
    items: "Shirt x3, Suit x1",
    type: "Combo",
    status: "Washing",
    pickAssigned: "Ali",
    dropAssigned: "Not Assigned",
  },
  {
    id: 3,
    customer: "John Doe",
    items: "Jacket x1",
    type: "Dry-clean",
    status: "Picked",
    pickAssigned: "Rahim",
    dropAssigned: "Not Assigned",
  },
];

const statusSteps = [
  "Booked",
  "Picked",
  "Washing",
  "Drying",
  "Ironing",
  "Packing",
  "Out for delivery",
  "Completed",
];

export default function BranchOrdersPage() {
  const [orders, setOrders] = useState(initialBranchOrders);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter((o) =>
    o.customer.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: number, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const assignDeliveryMan = (id: number, type: "pick" | "drop") => {
    const name = prompt("Enter delivery man name:");
    if (!name) return;
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? type === "pick"
            ? { ...o, pickAssigned: name }
            : { ...o, dropAssigned: name }
          : o
      )
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Branch Orders</h1>
        <input
          type="text"
          placeholder="Search by customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-2 border rounded w-80"
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Items</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Pick Assigned</th>
              <th className="p-3">Drop Assigned</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.items}</td>
                <td className="p-3">{order.type}</td>
                <td className="p-3">
                  <StatusStepper
                    currentStatus={order.status}
                    steps={statusSteps}
                  />
                </td>
                <td className="p-3">{order.pickAssigned}</td>
                <td className="p-3">{order.dropAssigned}</td>
                <td className="p-3 flex flex-col gap-2">
                  {/* Update Status */}
                  <Select
                    value={order.status}
                    onValueChange={(val) => updateStatus(order.id, val)}
                  >
                    <SelectTrigger className="w-44">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusSteps.map((step) => (
                        <SelectItem key={step} value={step}>
                          {step}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Assign Delivery Man */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => assignDeliveryMan(order.id, "pick")}
                    >
                      Assign Pick
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => assignDeliveryMan(order.id, "drop")}
                    >
                      Assign Drop
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

// ---------------- Status Stepper ----------------
function StatusStepper({
  currentStatus,
  steps,
}: {
  currentStatus: string;
  steps: string[];
}) {
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-full ${
              index <= currentIndex ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          <span
            className={`text-xs ${
              index <= currentIndex ? "text-green-600" : "text-gray-400"
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className="w-4 h-0.5 bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}

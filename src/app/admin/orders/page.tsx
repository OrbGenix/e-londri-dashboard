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

// Dummy Data
const initialOrders = [
  {
    id: 1,
    customer: "Talal Mahmud",
    branch: "Central Laundry",
    items: "Shirt x2, Pants x1",
    type: "Wash",
    status: "Booked",
    deliveryMan: "Not Assigned",
  },
  {
    id: 2,
    customer: "John Doe",
    branch: "Downtown Dryclean",
    items: "Jacket x1",
    type: "Dry-clean",
    status: "Picked",
    deliveryMan: "Ali",
  },
  {
    id: 3,
    customer: "Jane Smith",
    branch: "Central Laundry",
    items: "Shirt x3, Suit x1",
    type: "Combo",
    status: "Washing",
    deliveryMan: "Not Assigned",
  },
];

const statuses = [
  "Booked",
  "Picked",
  "Washing",
  "Drying",
  "Ironing",
  "Packing",
  "Out for delivery",
  "Completed",
];

export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");

  const filteredOrders = orders.filter(
    (o) =>
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.branch.toLowerCase().includes(search.toLowerCase())
  );

  const updateStatus = (id: number, status: string) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const assignDeliveryMan = (id: number, name: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, deliveryMan: name } : o))
    );
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
        <div>
          <input
            type="text"
            placeholder="Search by customer or branch..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 border rounded w-80"
          />
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Branch</th>
              <th className="p-3">Items</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Delivery Man</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.customer}</td>
                <td className="p-3">{order.branch}</td>
                <td className="p-3">{order.items}</td>
                <td className="p-3">{order.type}</td>
                <td className="p-3">
                  <Badge
                    variant={
                      order.status === "Completed" ? "success" : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                </td>
                <td className="p-3">{order.deliveryMan}</td>
                <td className="p-3 flex gap-2">
                  {/* Status Selector */}
                  <Select
                    value={order.status}
                    onValueChange={(val) => updateStatus(order.id, val)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Assign Delivery Man */}
                  <Button
                    size="sm"
                    onClick={() => {
                      const name = prompt(
                        "Enter delivery man name:",
                        order.deliveryMan
                      );
                      if (name) assignDeliveryMan(order.id, name);
                    }}
                  >
                    Assign
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

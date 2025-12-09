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

// Dummy inventory data
const initialInventory = [
  {
    id: 1,
    name: "Detergent",
    quantity: 50,
    unit: "kg",
    minThreshold: 20,
  },
  {
    id: 2,
    name: "Fabric Softener",
    quantity: 10,
    unit: "L",
    minThreshold: 15,
  },
  {
    id: 3,
    name: "Plastic Bags",
    quantity: 200,
    unit: "pcs",
    minThreshold: 50,
  },
];

const units = ["kg", "L", "pcs"];

export default function InventoryPage() {
  const [inventory, setInventory] = useState(initialInventory);
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState<any>(null);

  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setInventory((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleAddOrEdit = (item: any) => {
    if (editingItem) {
      setInventory((prev) =>
        prev.map((i) => (i.id === editingItem.id ? { ...item, id: i.id } : i))
      );
      setEditingItem(null);
    } else {
      setInventory((prev) => [...prev, { ...item, id: prev.length + 1 }]);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Branch Inventory</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>{editingItem ? "Edit Item" : "Add Item"}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItem ? "Edit Inventory Item" : "Add New Inventory Item"}
              </DialogTitle>
            </DialogHeader>
            <InventoryForm
              item={editingItem}
              onSubmit={handleAddOrEdit}
              onCancel={() => setEditingItem(null)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex mb-4">
        <Input
          placeholder="Search inventory..."
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
              <th className="p-3">Quantity</th>
              <th className="p-3">Unit</th>
              <th className="p-3">Min Threshold</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{item.id}</td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.unit}</td>
                <td className="p-3">{item.minThreshold}</td>
                <td className="p-3">
                  {item.quantity <= item.minThreshold ? (
                    <Badge variant="destructive">Low Stock</Badge>
                  ) : (
                    <Badge variant="success">Sufficient</Badge>
                  )}
                </td>
                <td className="p-3 flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(item)}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Inventory Item</DialogTitle>
                      </DialogHeader>
                      <InventoryForm
                        item={item}
                        onSubmit={handleAddOrEdit}
                        onCancel={() => setEditingItem(null)}
                      />
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
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

// ---------------- Inventory Form Component ----------------
function InventoryForm({ item, onSubmit, onCancel }: any) {
  const [name, setName] = useState(item?.name || "");
  const [quantity, setQuantity] = useState(item?.quantity || 0);
  const [unit, setUnit] = useState(item?.unit || "kg");
  const [minThreshold, setMinThreshold] = useState(item?.minThreshold || 0);

  const handleSubmit = () => {
    if (!name || quantity < 0 || !unit || minThreshold < 0) return;
    onSubmit({ name, quantity, unit, minThreshold });
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Input
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="Quantity"
        type="number"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <Select value={unit} onValueChange={(val) => setUnit(val)}>
        <SelectTrigger>
          <SelectValue placeholder="Select Unit" />
        </SelectTrigger>
        <SelectContent>
          {units.map((u) => (
            <SelectItem key={u} value={u}>
              {u}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Minimum Threshold"
        type="number"
        value={minThreshold}
        onChange={(e) => setMinThreshold(parseInt(e.target.value))}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>{item ? "Update" : "Add"}</Button>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";


// TypeScript structure matching our MySQL schema
interface FoodItem {
  id?: number;
  name: string;
  description: string;
  price: number | string;
}

export default function App() {
  const [items, setItems] = useState<FoodItem[]>([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [formData, setFormData] = useState<FoodItem>({ name: "", description: "", price: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [statusMessage, setStatusMessage] = useState("");

  const API_URL = "https://food-manager-api-xyz.onrender.com/api/fooditem";

  // Load all items when component mounts
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
      setStatusMessage("Failed to fetch food items.");
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}?Name=${searchKeyword}`);
      setItems(res.data);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) return;

    try {
      if (editingId !== null) {
        // Run PUT update request
        await axios.put(`${API_URL}/${editingId}`, formData);
        setStatusMessage(`Item ${editingId} updated successfully!`);
        setEditingId(null);
      } else {
        // Run POST create request
        await axios.post(API_URL, formData);
        setStatusMessage("New food item added successfully!");
      }
      setFormData({ name: "", description: "", price: "" });
      fetchItems();
    } catch (err) {
      console.error("Submission error:", err);
      setStatusMessage("Error processing request.");
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      setStatusMessage(`Deleted item ID: ${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const startEdit = (item: FoodItem) => {
    if (item.id) {
      setEditingId(item.id);
      setFormData({ name: item.name, description: item.description, price: item.price });
    }
  };

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => {
        setStatusMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  return (
    <div className="min-h-screen bg-[url('/food-bg8.jpg')] bg-cover bg-center bg-no-repeat bg-fixed text-[#4a1b0c] p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <header className="border-b border-[#4a1b0c]/30 pb-4">
          <h1 className="text-2xl sm:text-3xl text-[#4a1b0c] font-bold tracking-tight">Food Item Menu Manager</h1>
          <p className="text-[#4a1b0c]/80 mt-2 text-sm sm:text-base">Full-stack MySQL + Express + React System</p>
        </header>

        {statusMessage && (
          <div className="bg-[#fdf6e3] border border-[#f4a623] text-[#4a1b0c] px-4 py-2 rounded text-sm sm:text-base">
            {statusMessage}
          </div>
        )}

        {/* Search & Actions Bar */}
        <section className="bg-[#fdf6e3] p-4 sm:p-6 rounded-xl border border-[#4a1b0c]/20">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="text"
              placeholder="Search by food item name..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              className="flex-1 bg-white border border-[#4a1b0c]/30 rounded-lg px-4 py-2 text-[#4a1b0c] focus:outline-none focus:border-[#d64545] w-full"
            />
            <div className="flex gap-3 sm:gap-4">
              <button type="submit" className="flex-1 sm:flex-none bg-[#f4a623] hover:bg-[#e0941a] text-[#4a1b0c] px-4 sm:px-6 py-2 rounded-lg font-medium transition whitespace-nowrap">
                Search
              </button>
              <button type="button" onClick={() => { setSearchKeyword(""); fetchItems(); }} className="flex-1 sm:flex-none bg-[#4a1b0c] hover:bg-[#3a1409] text-[#fdf6e3] px-4 py-2 rounded-lg transition whitespace-nowrap">
                Reset
              </button>
            </div>
          </form>
        </section>

        {/* Creation/Edit Form */}
        <section className="bg-[#fdf6e3] p-4 sm:p-6 rounded-xl border border-[#4a1b0c]/20">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-[#4a1b0c]">{editingId ? "Edit Food Item" : "Add New Food Item"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Item Name (e.g., Mc Aloo Tikki)"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-white border border-[#4a1b0c]/30 rounded-lg px-4 py-2 text-[#4a1b0c] placeholder:text-[#4a1b0c]/50 focus:outline-none focus:border-[#d64545] w-full"
                required
              />
              <input
                type="number"
                step="0.01"
                placeholder=" Price (eg., ₹ 450.00)"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-white border border-[#4a1b0c]/30 rounded-lg px-4 py-2 text-[#4a1b0c] placeholder:text-[#4a1b0c]/50 focus:outline-none focus:border-[#d64545] w-full"
                required
              />
            </div>
            <textarea
              placeholder="Item Description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white border border-[#4a1b0c]/30 rounded-lg px-4 py-2 text-[#4a1b0c] placeholder:text-[#4a1b0c]/50 focus:outline-none focus:border-[#d64545] h-20 resize-none"
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
              {editingId && (
                <button type="button" onClick={() => { setEditingId(null); setFormData({ name: "", description: "", price: "" }); }} className="bg-[#4a1b0c] hover:bg-[#3a1409] text-[#fdf6e3] px-4 py-2 rounded-lg transition order-2 sm:order-1">
                  Cancel
                </button>
              )}
              <button type="submit" className="bg-[#6b8e4e] hover:bg-[#5c7c42] text-white px-6 py-2 rounded-lg font-medium transition order-1 sm:order-2">
                {editingId ? "Update Item" : "Save Item"}
              </button>
            </div>
          </form>
        </section>

        {/* Data Grid Display */}
        <section className="space-y-4">
          <h2 className="text-lg sm:text-xl text-[#4a1b0c] font-semibold">Items Available ({items.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {items.map((item) => (
              <div key={item.id} className="bg-[#fdf6e3] p-4 sm:p-5 rounded-xl border border-[#4a1b0c]/20 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#4a1b0c] break-words">{item.name}</h3>
                    <span className="bg-[#6b8e4e]/15 text-[#4d6638] font-semibold px-2.5 py-1 rounded text-xs sm:text-sm border border-[#6b8e4e]/30 whitespace-nowrap shrink-0">
                      {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(Number(item.price))}
                    </span>
                  </div>
                  <p className="text-[#4a1b0c]/70 text-sm mt-2 break-words">{item.description || "No description provided."}</p>
                </div>
                <div className="flex gap-2 justify-end border-t border-[#4a1b0c]/15 pt-3">
                  <button onClick={() => startEdit(item)} className="text-sm bg-white hover:bg-[#f4ecd8] border border-[#4a1b0c]/25 text-[#4a1b0c] px-3 py-1.5 rounded transition">
                    Edit
                  </button>
                  <button onClick={() => item.id && handleDelete(item.id)} className="text-sm bg-[#d64545] hover:bg-[#c13939] border border-[#d64545] text-white px-3 py-1.5 rounded transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
            {items.length === 0 && (
              <p className="text-[#4a1b0c]/60 col-span-1 sm:col-span-2 text-center py-8 px-4 border border-dashed border-[#4a1b0c]/30 rounded-xl bg-[#fdf6e3]/60 text-sm sm:text-base">
                No items matching your criteria are present in the MySQL database.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
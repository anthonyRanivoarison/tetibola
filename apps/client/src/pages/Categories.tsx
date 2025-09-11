import React, {useEffect, useState} from "react";
import {api} from "../api/base"; // ton axios configuré
import {Button} from "../components/ui/Button";
import {Input} from "../components/ui/Input";
import {Alert} from "../components/ui/Alert";
import Spinner from "../components/ui/Spinner";

interface Category {
  id: string;
  name: string;
  is_active: boolean;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ title: string; content: string; type: "success" | "error" } | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("../categories", {withCredentials: true});
      console.log(res.data)
      setCategories(res.data);
    } catch (err: any) {
      setAlert({title: "Error", content: err.response?.data?.message || "Failed to load categories", type: "error"});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!newCategory.trim()) return;
    try {
      const res = await api.post("../categories", {name: newCategory}, {withCredentials: true});
      setCategories([...categories, res.data]);
      setAlert({title: "Success", content: "Category created successfully", type: "success"});
      setNewCategory("");
    } catch (err) {
      setAlert({title: "Error", content: "Failed to create category", type: "error"});
    }
  };

  const handleUpdate = async () => {
    if (!editingCategory) return;
    try {
      const res = await api.put(`../categories/${editingCategory.id}`, {name: editingCategory.name}, {withCredentials: true});
      setCategories(categories.map((cat) => (cat.id === editingCategory.id ? res.data : cat)));
      setAlert({title: "Success", content: "Category updated successfully", type: "success"});
      setEditingCategory(null);
    } catch (err) {
      setAlert({title: "Error", content: "Failed to update category", type: "error"});
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6  rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Expense Categories</h1>

      {loading && <Spinner/>}
      {alert && <Alert title={alert.title} content={alert.content} type={alert.type}/>}

      <div className="flex gap-2 mb-4">
        <Input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category name"
        />
        <Button onClick={handleCreate}>Add</Button>
      </div>

      {editingCategory && (
        <div className="flex gap-2 mb-4">
          <Input
            type="text"
            value={editingCategory.name}
            onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
          />
          <Button onClick={handleUpdate}>Save</Button>
          <Button onClick={() => setEditingCategory(null)} className="bg-gray-400">Cancel</Button>
        </div>
      )}

      <ul className="space-y-2">
        {categories.length == 0 && <h2>No categories found</h2>}
        {categories.length > 0 && categories.map((cat) => (
          <li key={cat.id} className="flex justify-between items-center bg-white px-4 py-2 rounded shadow-sm">
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;

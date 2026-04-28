import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ItemForm from "../components/ItemForm"
import EditItemForm from "../components/EditItemForm"
export default function ItemsPage() {
  const { token } = useAuth()
  const [items, setItems] = useState([])
  const [editingItem, setEditingItem] = useState(null)

  const handleUpdateClick = (item) => {
    setEditingItem(item)
  }

  const handleItemUpdated = (updatedItem) => {
    setItems(items.map((i) => i.id === updatedItem.id ? updatedItem : i))
  }

  const handleResetSequence = async () => {
    try {
      await api.post("/items/reset-sequence", {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Sequence berhasil direset ke 1")
    } catch (err) {
      console.error("Gagal reset sequence:", err)
    }
  }

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await api.get("/items", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setItems(data.data)
    }
    if (token) fetchItems()
  }, [token])

  // DELETE
  const handleDelete = async (id) => {
    try {
      await api.delete(`/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setItems(items.filter((item) => item.id !== id)) // update state
    } catch (err) {
      console.error("Gagal delete:", err)
    }
  }

  // UPDATE (contoh sederhana: ubah nama jadi "Updated")
  const handleUpdate = async (id) => {
    try {
      const { data } = await api.put(`/items/${id}`, {
        name: "Updated Item",
        price: 9999,
        description: "Updated description"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setItems(items.map((item) => item.id === id ? data.data : item))
    } catch (err) {
      console.error("Gagal update:", err)
    }
  }


  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-[800px] bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <ItemForm onItemCreated={(newItem) => setItems([...items, newItem])} />
          <div className="flex space-x-2 mb-4">
            <Button variant="secondary" onClick={handleResetSequence}>Reset Sequence</Button>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b border-gray-700 p-2">ID</th>
                <th className="border-b border-gray-700 p-2">Nama Item</th>
                <th className="border-b border-gray-700 p-2">Harga</th>
                <th className="border-b border-gray-700 p-2">Deskripsi</th>
                <th className="border-b border-gray-700 p-2">Created By</th>
                <th className="border-b border-gray-700 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="border-b border-gray-700 p-2">{item.id}</td>
                  <td className="border-b border-gray-700 p-2">{item.name}</td>
                  <td className="border-b border-gray-700 p-2">{item.price}</td>
                  <td className="border-b border-gray-700 p-2">{item.description}</td>
                  <td className="border-b border-gray-700 p-2">{item.created_by}</td>
                  <td className="border-b border-gray-700 p-2">
                    <Button variant="secondary" size="sm" onClick={() => handleUpdateClick(item)}>Edit</Button>
                    <Button variant="destructive" size="sm" className="ml-2" onClick={() => handleDelete(item.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      {editingItem && (
        <EditItemForm
          item={editingItem}
          onUpdated={handleItemUpdated}
          onClose={() => setEditingItem(null)}
        />
      )}
    </div>
  )
}

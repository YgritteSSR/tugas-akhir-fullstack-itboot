import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EditItemForm({ item, onUpdated, onClose }) {
  const { token } = useAuth()
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [description, setDescription] = useState(item.description)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.put(`/items/${item.id}`, {
        name,
        price,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      onUpdated(data.data) // update parent state
      onClose()
    } catch (err) {
      console.error("Gagal update:", err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-6 rounded shadow-lg w-[400px] text-white">
        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <Input value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="secondary" onClick={onClose}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// src/components/ItemForm.jsx
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"


export default function ItemForm({ onItemCreated }) {
  const { token } = useAuth()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post("/items", {
        name,
        price,
        description
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      onItemCreated(data.data) // kirim item baru ke parent
      setName("")
      setPrice("")
      setDescription("")
    } catch (err) {
      console.error("Gagal create item:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        placeholder="Nama Item"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="number"
        placeholder="Harga"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
      />
      <Input
        placeholder="Deskripsi"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <Button type="submit" variant="default">Tambah Item</Button>
    </form>
  )
}

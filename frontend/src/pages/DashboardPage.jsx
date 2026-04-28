import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import api from "../api/axios"

export default function DashboardPage() {
  const { user, token } = useAuth()
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        })
        setStats(data.data)
      } catch (err) {
        console.error("Gagal ambil dashboard:", err)
      }
    }
    if (token) fetchStats()
  }, [token])

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Selamat datang, {user?.username}!</p>

      {/* Info User */}
      <div className="bg-gray-900 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Informasi Akun</h2>
        <p><span className="font-bold">Username:</span> {user?.username}</p>
        <p><span className="font-bold">Email:</span> {user?.email}</p>
        <p><span className="font-bold">Role:</span> {user?.role}</p>
      </div>

      {stats ? (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg">Total Users</h2>
            <p className="text-3xl font-bold text-green-400">{stats.totalUsers}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg">My Items</h2>
            <p className="text-3xl font-bold text-blue-400">{stats.myItems}</p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

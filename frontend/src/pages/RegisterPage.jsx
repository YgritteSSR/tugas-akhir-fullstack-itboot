import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function RegisterPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      })
      if (res.ok) {
        alert("Register berhasil! Silakan login.")
        navigate("/login") // redirect ke login
      } else {
        const data = await res.json()
        alert(data.message || "Register gagal")
      }
    } catch (err) {
      console.error(err)
      alert("Terjadi error saat register")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-[400px] bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Register</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white"
            />
            <Button type="submit" className="bg-gray-700 hover:bg-gray-600">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

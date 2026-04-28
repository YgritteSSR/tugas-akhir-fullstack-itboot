import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="w-full bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Logo / Brand */}
      <div className="text-xl font-bold">
        <Link to="/home" className="hover:text-gray-300">IT_BOOT</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/home" className="hover:text-gray-300">Home</Link>
        <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/items" className="hover:text-gray-300">Items</Link>
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-2">
        <Button asChild variant="secondary">
          <Link to="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link to="/register">Register</Link>
        </Button>
      </div>
    </nav>
  )
}

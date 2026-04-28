import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Card className="w-[400px] bg-gray-900 text-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">Welcome to IT_BOOT</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-300 text-center mb-6">
            Ini adalah halaman utama project Tugas Akhir Richie Sanjiro.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4 bg-gray-800">
          <Button asChild className="bg-gray-700"><a href="/login">Login</a></Button>
          <Button asChild variant="secondary"><a href="/register">Register</a></Button>
        </CardFooter>
      </Card>
    </div>
  )
}

import "./globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "PYGMI - Text to Image Generator",
  description: "Generate images from text prompts using AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}

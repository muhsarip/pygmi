import "./globals.css"
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "PYGMI - AI Image Generator",
  description: "Generate stunning images from text prompts using AI. Transform your ideas into beautiful visuals with PYGMI.",
  keywords: ["AI", "image generator", "text to image", "AI art", "PYGMI"],
  authors: [{ name: "PYGMI" }],
  themeColor: "#9333EA",
  manifest: "/manifest.json",
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

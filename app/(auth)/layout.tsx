export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="gradient-card rounded-2xl p-8 shadow-2xl">
          {children}
        </div>
      </div>
    </div>
  )
}

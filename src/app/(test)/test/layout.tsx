import './test.css'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
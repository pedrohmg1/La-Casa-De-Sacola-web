import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* O 'children' é onde o Next.js vai injetar o conteúdo de cada página */}
        {children}
      </body>
    </html>
  )
}
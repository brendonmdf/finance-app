import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finance.ai - Autenticação",
  description: "Faça login ou registre-se na plataforma Finance.ai",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <AuthProvider>
          <div className="flex min-h-screen items-center justify-center">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Github, Sparkles, TrendingUp, Shield, Zap } from "lucide-react"
import Link from "next/link"

export function LoginForm() {
  const { signIn } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError("")
    
    try {
      const { error } = await signIn(data.email, data.password)
      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError("Erro inesperado. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Coluna Esquerda - Branding */}
      <div className="hidden lg:flex lg:w-[60%] bg-gradient-to-br from-green-900/20 via-green-800/10 to-green-900/20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,197,94,0.08),transparent_50%)]" />
        
        {/* Logo e Branding */}
        <div className="relative z-10 p-8 w-full">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-green-400">Finance.ai</span>
          </div>
          
          {/* Espaço central vazio para respiração visual */}
          <div className="flex-1" />
          
          {/* Citação inspiradora */}
          <div className="mb-8">
            <blockquote className="text-green-300 text-lg leading-relaxed">
              "Esta plataforma revolucionou minha gestão financeira, permitindo que eu tome decisões mais inteligentes e alcance meus objetivos financeiros com confiança."
            </blockquote>
            <cite className="text-green-400 text-sm font-medium">
              — Maria Silva, Consultora Financeira
            </cite>
          </div>
        </div>
        
        {/* Elementos decorativos */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-green-400/10 rounded-full blur-2xl" />
      </div>

      {/* Coluna Direita - Formulário */}
      <div className="flex-1 lg:w-[40%] bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header do formulário */}
          <div className="text-center space-y-2">
            <div className="flex justify-end">
              <Link 
                href="/auth/register" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Criar conta
              </Link>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Entrar na sua conta
              </h1>
              <p className="text-muted-foreground">
                Digite suas credenciais abaixo para acessar sua conta
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                {...register("email")}
                className="h-12"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className="h-12"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar com Email"}
            </Button>
          </form>

          {/* Separador */}
          <div className="relative">
            <Separator className="my-6" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-background px-4 text-sm text-muted-foreground">
                OU CONTINUAR COM
              </span>
            </div>
          </div>

          {/* Botão GitHub */}
          <Button 
            variant="outline" 
            className="w-full h-12 border-border hover:bg-accent"
            disabled={isLoading}
          >
            <Github className="w-5 h-5 mr-2" />
            GitHub
          </Button>

          {/* Links úteis */}
          <div className="text-center space-y-4">
            <div className="text-sm text-muted-foreground">
              <span>Não tem uma conta? </span>
              <Link 
                href="/auth/register" 
                className="text-green-500 hover:text-green-400 font-medium underline underline-offset-2"
              >
                Criar conta
              </Link>
            </div>
            
            <div className="text-xs text-muted-foreground">
              Ao continuar, você concorda com nossos{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-foreground">
                Termos de Serviço
              </Link>{" "}
              e{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                Política de Privacidade
              </Link>
              .
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

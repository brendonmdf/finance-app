"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema } from "@/lib/validations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Github, TrendingUp, CheckCircle } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  const { signUp } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const password = watch("password")

  const onSubmit = async (data: any) => {
    setIsLoading(true)
    setError("")
    setSuccess("")
    
    try {
      const { error } = await signUp(data.email, data.password, data.full_name)
      if (error) {
        setError(error.message)
      } else {
        setSuccess("Conta criada com sucesso! Verifique seu email para confirmar.")
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
          
          {/* Benefícios da plataforma */}
          <div className="mb-8 space-y-6">
            <h3 className="text-xl font-semibold text-green-300 mb-4">
              Por que escolher o Finance.ai?
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-green-200">Gestão inteligente de finanças</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-green-200">Análises avançadas com IA</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-green-200">Metas financeiras personalizadas</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <span className="text-green-200">Relatórios detalhados</span>
              </div>
            </div>
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
                href="/auth/login" 
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Já tem conta? Entrar
              </Link>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Criar uma conta
              </h1>
              <p className="text-muted-foreground">
                Digite suas informações abaixo para criar sua conta
              </p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="full_name">Nome completo</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="Seu nome completo"
                {...register("full_name")}
                className="h-12"
              />
              {errors.full_name && (
                <p className="text-sm text-red-500">{errors.full_name.message}</p>
              )}
            </div>

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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className="h-12"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-green-500">{success}</p>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Criando conta..." : "Criar conta"}
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
              <span>Já tem uma conta? </span>
              <Link 
                href="/auth/login" 
                className="text-green-500 hover:text-green-400 font-medium underline underline-offset-2"
              >
                Entrar
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

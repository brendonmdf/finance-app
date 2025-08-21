import { LoginForm } from "@/components/auth/LoginForm"
import { DebugSupabase } from "@/components/DebugSupabase"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function LoginPage() {
  return (
    <>
      <LoginForm />
      <DebugSupabase />
    </>
  )
}

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function useSupabase() {
  const [isReady, setIsReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!supabase) {
      setError('Supabase não está configurado. Verifique as variáveis de ambiente.')
      return
    }

    // Testar conexão
    const testConnection = async () => {
      try {
        const { data, error } = await supabase.from('profiles').select('count').limit(1)
        if (error) {
          setError(`Erro de conexão: ${error.message}`)
        } else {
          setIsReady(true)
        }
      } catch (err) {
        setError(`Erro inesperado: ${err instanceof Error ? err.message : 'Erro desconhecido'}`)
      }
    }

    testConnection()
  }, [])

  return { isReady, error, supabase }
}

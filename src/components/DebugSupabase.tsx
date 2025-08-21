'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export function DebugSupabase() {
  const [status, setStatus] = useState<string>('Verificando...')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        if (!supabase) {
          setStatus('❌ Supabase não configurado')
          setError('Cliente Supabase não foi criado')
          return
        }

        setStatus('🔄 Testando conexão...')
        
        // Testar conexão básica
        const { data, error: connectionError } = await supabase
          .from('profiles')
          .select('count')
          .limit(1)

        if (connectionError) {
          setStatus('❌ Erro de conexão')
          setError(connectionError.message)
        } else {
          setStatus('✅ Supabase conectado com sucesso!')
          setError(null)
        }
      } catch (err) {
        setStatus('❌ Erro inesperado')
        setError(err instanceof Error ? err.message : 'Erro desconhecido')
      }
    }

    checkSupabase()
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-sm z-50">
      <h3 className="font-bold mb-2">Debug Supabase</h3>
      <p className="text-sm mb-1">Status: {status}</p>
      {error && (
        <p className="text-sm text-red-400">Erro: {error}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">
        URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Não definida'}
      </p>
    </div>
  )
}

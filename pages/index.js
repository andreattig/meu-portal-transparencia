import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

// COLE AQUI suas informações do Supabase:
const supabaseUrl = 'https://subhhnoxujphauoxfpmw.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1Ymhobm94dWpwaGF1b3hmcG13Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMDEzODQsImV4cCI6MjA3MjU3NzM4NH0.OBT_ztEUbTSYWHjxxtBz5MG2puD6fA9z92ESVHIOJuM'
const supabase = createClient(supabaseUrl, supabaseKey)

export default function Home() {
  const [politicos, setPoliticos] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(false)

  // Função para buscar políticos
  const buscarPoliticos = async () => {
    setLoading(true)
    let query = supabase.from('politicos').select('*')
    
    if (busca) {
      query = query.ilike('nome', `%${busca}%`)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.log('Erro:', error)
    } else {
      setPoliticos(data)
    }
    setLoading(false)
  }

  // Buscar políticos ao carregar a página
  useEffect(() => {
    buscarPoliticos()
  }, [])

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '20px',
      backgroundColor: '#ffffff',
      color: '#000000'
    }}>
      {/* Cabeçalho */}
      <header style={{
        textAlign: 'center',
        padding: '40px 0',
        borderBottom: '2px solid #000000',
        marginBottom: '40px'
      }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 20px 0' }}>
          Portal de Transparência Política
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>
          Informações sobre políticos e suas empresas no Brasil
        </p>
      </header>

      {/* Busca */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          gap: '10px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="Digite o nome do político..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              flex: 1,
              padding: '15px',
              border: '2px solid #000000',
              borderRadius: '5px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={buscarPoliticos}
            disabled={loading}
            style={{
              padding: '15px 30px',
              backgroundColor: '#000000',
              color: '#ffffff',
              border: 'none',
              borderRadius: '5px',
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
      </div>

      {/* Resultados */}
      <div>
        <h2 style={{ marginBottom: '30px' }}>
          {politicos.length} político(s) encontrado(s)
        </h2>
        
        {politicos.map((politico) => (
          <div key={politico.id} style={{
            border: '2px solid #000000',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '20px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem' }}>
              {politico.nome}
            </h3>
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <span><strong>Cargo:</strong> {politico.cargo}</span>
              <span><strong>Partido:</strong> {politico.partido}</span>
              <span><strong>Estado:</strong> {politico.estado}</span>
              <span><strong>Cidade:</strong> {politico.cidade}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 0',
        borderTop: '2px solid #000000',
        marginTop: '40px',
        color: '#666'
      }}>
        <p>Portal de Transparência - Dados públicos brasileiros</p>
      </footer>
    </div>
  )
}

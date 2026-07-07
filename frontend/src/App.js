import React, { useState } from 'react'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkHealth = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ status: 'error', error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <h1>React + Node.js サンプル</h1>
      <button onClick={checkHealth} disabled={loading}>
        {loading ? '確認中...' : 'ヘルスチェックを確認する'}
      </button>
      {result && (
        <pre style={{ marginTop: '1rem', background: '#f0f0f0', padding: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default App

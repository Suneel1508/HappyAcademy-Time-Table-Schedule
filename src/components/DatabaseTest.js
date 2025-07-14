import { useState, useEffect } from 'react'
import { supabase, dbOperations } from '../lib/supabase.js'

export function DatabaseTest() {
  const [connectionStatus, setConnectionStatus] = useState('testing')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    testConnection()
  }, [])

  const testConnection = async () => {
    try {
      setConnectionStatus('testing')
      setError(null)
      
      // Test basic connection
      const { data: testData, error: testError } = await supabase
        .from('students') // Replace with one of your actual table names
        .select('count')
        .limit(1)
      
      if (testError) {
        throw testError
      }
      
      setConnectionStatus('connected')
      setData(testData)
    } catch (err) {
      setConnectionStatus('error')
      setError(err.message)
    }
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-600'
      case 'error': return 'text-red-600'
      default: return 'text-yellow-600'
    }
  }

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return '✅'
      case 'error': return '❌'
      default: return '🔄'
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
      <h3 className="text-lg font-semibold mb-4">Supabase Connection Status</h3>
      
      <div className={`flex items-center gap-2 mb-4 ${getStatusColor()}`}>
        <span className="text-xl">{getStatusIcon()}</span>
        <span className="font-medium">
          {connectionStatus === 'testing' && 'Testing connection...'}
          {connectionStatus === 'connected' && 'Connected to Supabase!'}
          {connectionStatus === 'error' && 'Connection failed'}
        </span>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
          <p className="text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </p>
          <p className="text-red-600 text-xs mt-2">
            Make sure your .env file has the correct Supabase URL and API key.
          </p>
        </div>
      )}

      {connectionStatus === 'connected' && (
        <div className="bg-green-50 border border-green-200 rounded p-3">
          <p className="text-green-700 text-sm">
            Successfully connected to your "happyacademy-timetable" project!
          </p>
        </div>
      )}

      <button 
        onClick={testConnection}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Test Connection Again
      </button>
    </div>
  )
}
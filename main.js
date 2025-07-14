import './style.css'
import { DatabaseTest } from './src/components/DatabaseTest.js'
import { createElement } from 'react'
import { createRoot } from 'react-dom/client'

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Happy Academy Timetable</h1>
    <p class="subtitle">Connecting to Supabase Database</p>
    <div class="card">
      <div id="database-test"></div>
    </div>
    <p class="read-the-docs">
      Configure your Supabase credentials in the .env file
    </p>
  </div>
`

// Mount React component for database testing
const container = document.querySelector('#database-test')
const root = createRoot(container)
root.render(createElement(DatabaseTest))

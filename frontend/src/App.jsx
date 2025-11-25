import React from 'react'
import Calculator from './components/Calculator'
import ErrorBoundary from './components/ErrorBoundary'
import './index.css'

function App() {
  return (
    <div className="app">
      <h1>Simple Calculator</h1>
      <ErrorBoundary>
        <Calculator />
      </ErrorBoundary>
    </div>
  )
}

export default App

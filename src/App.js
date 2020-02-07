import React from 'react'
import Routes from './Routes'
import MrLegendProvider from 'providers/AppProvider'
import './index.css'

const App = () => {
  return (
    <MrLegendProvider>
      <Routes />
    </MrLegendProvider>
  )
}

export default App

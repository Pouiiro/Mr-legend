import React from 'react'
import Routes from './Routes'

// import ScrollToTop from 'react-router-scroll-top'

import MrLegendProvider from 'providers/AppProvider'

const App = () => {
  return (
    <MrLegendProvider>
      <Routes />
    </MrLegendProvider>
  )
}

export default App

import React from 'react'

import Routes from './Routes'

// import ScrollToTop from 'react-router-scroll-top'

import GlobalStyles from 'global/style'
import MrLegendProvider from 'providers/AppProvider'

const App = () => {
  return (
    <MrLegendProvider>
      <Routes />
      <GlobalStyles />
    </MrLegendProvider>
  )
}

export default App

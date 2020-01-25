import React from 'react'
import Home from 'components/home/home'
import Profile from 'components/profile/profile'
import Navbar from 'components/common/navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import GlobalStyles from 'global/style'
import MrLegendProvider from 'providers/appProvider'

const App = () => {
  return (
    <MrLegendProvider>
      <Router>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/ranking" />
            <Route path="/profile" component={Profile} />
            <Route path="/about" />
          </Switch>
        </ScrollToTop>
        <GlobalStyles />
      </Router>
    </MrLegendProvider>
  )
}

export default App

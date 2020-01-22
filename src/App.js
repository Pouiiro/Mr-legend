import React, { Component } from 'react'
import Home from 'components/home/home'
import Navbar from 'components/common/navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import GlobalStyles from 'global/style'

class App extends Component {
  state = {
    navbarOpen: false
  }

  handleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  render() {
    return (
      <Router>
        <ScrollToTop>
          <Navbar
            navbarState={this.state.navbarOpen}
            handleNavbar={this.handleNavbar}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/ranking" />
            <Route path="/about" />
          </Switch>
        </ScrollToTop>
        <GlobalStyles />
      </Router>
    )
  }
}

export default App

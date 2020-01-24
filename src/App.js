import React, { Component } from 'react'
import Home from 'components/home/home'
import Navbar from 'components/common/navbar/Navbar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ScrollToTop from 'react-router-scroll-top'
import GlobalStyles from 'global/style'
import champion from 'data/champion'

class App extends Component {
  state = {
    navbarOpen: false,
    playerData: [],
    currentUser: '',
    gameData: [
      { name: 'Game', status: 'N/A', incidents: 'Riot API not responding' },
      { name: 'Store', status: 'N/A', incidents: 'Riot API not responding' },
      { name: 'Website', status: 'N/A', incidents: 'Riot API not responding' },
      { name: 'Client', status: 'N/A', incidents: 'Riot API not responding' }
    ],
    champData: [],
    rotationChamps: [],
    isTop: true
  }

  callAPI = () => {
    fetch(`http://localhost:3001/lolinfo?name=${this.state.currentUser}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          playerData: data[0],
          gameData: data[1],
          rotationChamps: data[2]
        })
      )
  }

  onInput = value => {
    this.setState({
      currentUser: value
    })
  }
  componentDidMount() {
    const champs = Object.entries(champion.data)
    for (let index = 0; index < champs.length; index++) {
      const element = champs[index]
      const newEl = element[1]
      this.state.champData.push(newEl)
    }
    this.callAPI()
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
            <Route
              exact
              path="/"
              render={props => (
                <Home
                  {...props}
                  state={this.state}
                  getUserdata={this.callAPI}
                  inputUser={this.onInput}
                />
              )}
            />
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

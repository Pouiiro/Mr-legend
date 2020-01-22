import React, { Component } from 'react'
import Contacts from './components/contacts'
class App extends Component {
  state = {
    contacts: []
  }

  componentDidMount() {
    fetch(
      'https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/shyuki',
      {
        method: 'GET',
        headers: {
          'X-Riot-Token': process.env.RIOT_LOL_API_KEY
        }
      }
    )
      .then(res => res.json())
      .then(data => {
        this.setState({ contacts: data })
        console.log(this.state)
      })
      .catch(console.log)
  }

  render() {
    return <Contacts contacts={this.state.contacts} />
  }
}

export default App

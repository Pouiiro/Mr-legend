import React, { useEffect, createContext, useState } from 'react'
import axios from 'axios'
import champion from 'data/champion'

export const MrLegendContext = createContext()

export default ({ children }) => {
  const defaultData = {
    playerData: [],
    gameData: [
      { name: 'Game', status: 'N/A', incidents: 'Riot API not responding' },
      { name: 'Store', status: 'N/A', incidents: 'Riot API not responding' },
      {
        name: 'Website',
        status: 'N/A',
        incidents: 'Riot API not responding'
      },
      { name: 'Client', status: 'N/A', incidents: 'Riot API not responding' }
    ],
    champData: [],
    rotationChamps: []
  }
  const [user, setUser] = useState({ currentUser: '' })
  const [state, setState] = useState(defaultData)

  const champs = Object.entries(champion.data)
  for (let index = 0; index < champs.length; index++) {
    const element = champs[index]
    const newEl = element[1]
    state.champData.push(newEl)
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `http://localhost:3001/lolinfo?name=${state.currentUser}`
      )
      setState({
        ...state,
        playerData: result.data[0],
        gameData: result.data[1],
        rotationChamps: result.data[2]
      })
    }
    fetchData()
  }, [user, state, useState])

  return (
    <MrLegendContext.Provider
      value={{
        state,
        setState,
        user,
        setUser
      }}
    >
      {children}
    </MrLegendContext.Provider>
  )
}

import React, { createContext, useState, useEffect } from 'react'
import champion from 'data/champion'
export const MrLegendContext = createContext()

export default ({ children }) => {
  const champs = Object.entries(champion.data)
  const [dark, setDark] = useState(false)
  const [user, setUser] = useState('')
  const [state, setState] = useState({
    SummonerData: {
      playerData: [],
      champData: [],
      rankData: [],
      matchH: [],
      matchHs: []
    },
    gameData: [],
    champData: [],
    rotationChamps: [],
    QueueData: []
  })

  const chichi = () => {
    champs.forEach((item, index) => {
      const element = champs[index]
      const champies = element[1]
      state.champData.push(champies)
    })
  }

  useEffect(() => {
    state.champData = []
    chichi()
  }, [chichi])

  return (
    <MrLegendContext.Provider
      value={{
        state,
        setState,
        user,
        setUser,
        dark,
        setDark
      }}
    >
      {children}
    </MrLegendContext.Provider>
  )
}

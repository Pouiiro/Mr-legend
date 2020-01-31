import React, { useEffect, useState, useContext, useCallback } from 'react'
import axios from 'axios'
import { MrLegendContext } from 'providers/AppProvider'
import FadeIn from 'react-fade-in'
import Intro from './Intro'
import Loading from '../loading/Loading'
import GInfo from './Gameinfo'
import Cinfo from './Champsinfo'

import { ContainerS } from 'global/styles'
import 'global/btn.css'

export default () => {
  const [loading, setLoading] = useState(true)
  const { state, setState } = useContext(MrLegendContext)

  const getCharacter = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:3001/lol`)
      setState({
        ...state,
        gameData: data[0],
        rotationChamps: data[1]
      })
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
  }, [setState])

  useEffect(() => {
    getCharacter()
  }, [getCharacter])

  return (
    <div>
      {loading ? (
        <div>
          <Loading />
        </div>
      ) : (
        <FadeIn>
          <ContainerS>
            <Intro />
            <GInfo />
            <Cinfo />
          </ContainerS>
        </FadeIn>
      )}
    </div>
  )
}

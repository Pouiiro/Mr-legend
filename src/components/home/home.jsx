import React from 'react'
import Intro from './intro'
import GInfo from './gameinfo'
import Cinfo from './champsinfo'
import { ContainerS } from 'global/styles'
import 'global/btn.css'

const Home = ({ state, getUserdata, inputUser }) => {
  return (
    <ContainerS>
      <Intro getUserdata={getUserdata} inputUser={inputUser} state={state} />
      <GInfo state={state} />
      <Cinfo state={state} />
    </ContainerS>
  )
}

export default Home

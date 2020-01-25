import React from 'react'
import Intro from './intro'
import GInfo from './gameinfo'
import Cinfo from './champsinfo'
import { ContainerS } from 'global/styles'
import 'global/btn.css'

const Home = () => {
  return (
    <ContainerS>
      <Intro />
      <GInfo />
      <Cinfo />
    </ContainerS>
  )
}

export default Home

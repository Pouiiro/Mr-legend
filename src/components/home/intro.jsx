import React, { useContext } from 'react'
import { Parallax } from 'react-parallax'
import { MrLegendContext } from 'providers/AppProvider'
import {
  Div,
  Div1,
  Title,
  Img,
  Input,
  ButtonD,
  ButtonS,
  Img1
} from 'global/styles'
import gnr from 'assets/images/input.png'
import logo from 'assets/images/cover3.png'
import bg1 from 'assets/images/bg1.jpg'

const Intro = () => {
  const { setUser } = useContext(MrLegendContext)
  let summoner = ''

  return (
    <Parallax bgImage={bg1} strength={500}>
      <Div style={{ height: '720px' }}>
        <Div1>
          <Title>
            <Img src={logo} />
          </Title>
          <Input
            onChange={e => {
              summoner = e.target.value
            }}
            type="text"
            placeholder="SUMMONER NAME"
          />
          <ButtonD onClick={() => setUser(summoner)}>
            <ButtonS to="/profile" className="btn btn-white btn-				 animate">
              Let's Go
            </ButtonS>
          </ButtonD>
          <Img1 src={gnr} />
        </Div1>
      </Div>
    </Parallax>
  )
}

export default Intro

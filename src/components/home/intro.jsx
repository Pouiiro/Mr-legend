import React, { useContext } from 'react'
import { ParallaxLayer } from 'react-spring/renderprops-addons'
import { MrLegendContext } from 'providers/AppProvider'
import { Img, Input, ButtonD, ButtonS } from 'global/styles'
import logo from 'assets/images/cover3.png'

const Intro = () => {
  const { setUser } = useContext(MrLegendContext)
  let summoner = ''
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    flexdirection: 'column',
    flexWrap: 'nowrap'
  }
  return (
    <>
      <ParallaxLayer factor={0.1} offset={0.3} speed={1} style={style}>
        <Img src={logo} />
      </ParallaxLayer>
      <ParallaxLayer factor={0.1} offset={0.45} speed={2} style={style}>
        <Input
          onChange={e => {
            summoner = e.target.value
          }}
          type="text"
          placeholder="SUMMONER NAME"
        />
      </ParallaxLayer>
      <ParallaxLayer factor={0.1} offset={0.55} speed={-2} style={style}>
        <ButtonD onClick={() => setUser(summoner)}>
          <ButtonS to="/profile" className="btn btn-white btn-				 animate">
            Let's Go
          </ButtonS>
        </ButtonD>
      </ParallaxLayer>
    </>
  )
}

export default Intro

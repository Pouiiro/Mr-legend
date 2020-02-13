import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef
} from 'react'
import axios from 'axios'
import { MrLegendContext } from 'providers/AppProvider'
import Intro from './Intro'
import Loading from '../loading/Loading'
import GInfo from './Gameinfo'
import Cinfo from './Champsinfo'
import 'global/btn.css'
import beemo from 'assets/images/beemo.png'
import skeemo from 'assets/images/skeemo.png'
import poro from 'assets/images/input.png'
import poro1 from 'assets/images/poro2.png'
import styled from 'styled-components'
import { Parallax, ParallaxLayer } from 'react-spring/renderprops-addons'

export default () => {
  const [loading, setLoading] = useState(true)
  const { state, setState } = useContext(MrLegendContext)
  const lApi = 'API'
  const inputEl = useRef()
  const getCharacter = useCallback(async () => {
    try {
      const { data } = await axios.get(`${lApi}status`)
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
  return loading ? (
    <Loading />
  ) : (
    <Parallax
      ref={inputEl}
      pages={3}
      scrolling={false}
      style={{
        backgroundImage:
          'url("https://preview.redd.it/in73r6sbixz31.png?width=4096&format=png&auto=webp&s=810fa4aef8f17b2ccf3ca4c18601eb731904d37e")',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <ParallaxLayer factor={1} offset={0.1} speed={0}>
        <Img style={{ marginLeft: '40%' }} src={poro} />
      </ParallaxLayer>
      <ParallaxLayer factor={1} offset={0.6} speed={1.8}>
        <Img style={{ marginLeft: '80%' }} src={poro1} />
      </ParallaxLayer>
      <ParallaxLayer factor={1} offset={1.4} speed={-0.7}>
        <Img src={beemo} />
      </ParallaxLayer>
      <ParallaxLayer factor={1} offset={2.4} speed={-0.7}>
        <Img style={{ marginLeft: '80%' }} src={skeemo} />
      </ParallaxLayer>
      <ParallaxLayer factor={1} offset={2} speed={2}>
        <Bpage1 onClick={() => inputEl.current.scrollTo(0)}></Bpage1>
      </ParallaxLayer>
      <ParallaxLayer factor={1} offset={0} speed={1}>
        <Bpage1 onClick={() => inputEl.current.scrollTo(1)}></Bpage1>
      </ParallaxLayer>
      <ParallaxLayer factor={1} offset={1} speed={1}>
        <Bpage1 onClick={() => inputEl.current.scrollTo(2)}></Bpage1>
      </ParallaxLayer>

      <GInfo />
      <Cinfo />
      <Intro />
    </Parallax>
  )
}

const Bpage1 = styled.button`
  position: absolute;
  bottom: 10px;
  cursor: pointer;
  left: 50%;
  margin-left: -35px;
  width: 100px;
  height: 76px;
  border: none;
  box-shadow: 0 0 0 0 rgba(232, 76, 61, 0.7);
  background-color: #0000;
  background-image: url(https://www.pngkey.com/png/full/318-3184322_poro-poro-png-pixel-art.png);
  background-size: 80%;
  background-repeat: no-repeat;
  cursor: pointer;
  -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
  animation: heartbeat 1.5s ease-in-out infinite both;
  :focus {
    outline: 0 !important;
  }
  :hover {
    -webkit-animation: none;
    animation: none;
  }
`
const Img = styled.img`
  @media only screen and (max-width: 600px) {
    width: 40%;
  }
`

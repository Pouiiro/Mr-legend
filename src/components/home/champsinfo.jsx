import React, { useContext } from 'react'
import styled from 'styled-components'
import { ParallaxLayer } from 'react-spring/renderprops-addons'
import Slider from 'react-slick'
import { Title1, ContainerS, CDiv } from 'global/styles'
import 'global/btn.css'
import { Row, Col, Card, CardHeader, CardImg } from 'shards-react'
import { MrLegendContext } from 'providers/AppProvider'

const Cinfo = () => {
  const { state } = useContext(MrLegendContext)
  const rotation = state.rotationChamps
  const champs = state.champData
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
          arrows: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false
        }
      }
    ]
  }
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItem: 'center',
    flexdirection: 'column',
    flexWrap: 'nowrap'
  }

  const frir = rotation.map(element => {
    const obj = champs.find(obj => obj.key === element.toString())
    return (
      <div key={obj.key}>
        <CDiv>
          <Cardu>
            <Cheader>{obj.name}</Cheader>
            <Cimg
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${obj.id}_0.jpg`}
            />
          </Cardu>
        </CDiv>
      </div>
    )
  })

  return (
    <>
      <ParallaxLayer factor={0.1} offset={2.15} speed={3} style={style}>
        <Title1>Champion Rotations</Title1>
      </ParallaxLayer>
      <ParallaxLayer factor={0.5} offset={2.16} speed={2} style={style}>
        <ContainerS>
          <Row>
            <Col sm={12} md={12} lg={12}>
              <Slider
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  cursor: 'pointer'
                }}
                {...settings}
              >
                {frir}
              </Slider>
            </Col>
          </Row>
        </ContainerS>
      </ParallaxLayer>
    </>
  )
}
export default Cinfo

const Cheader = styled(CardHeader)`
  background-color: black;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  color: white;
  text-align: center;
  border-radius: 5px !important;
  font-family: 'Poppins', sans-serif !important;
  letter-spacing: 2px;
`

const Cimg = styled(CardImg)`
  width: 230px;
  height: 350px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 12px 18px 23px -4px rgba(0, 0, 0, 0.68);
  @media only screen and (max-width: 600px) {
    width: 180px;
    height: 300px;
  }
`

const Cardu = styled(Card)`
  background-color: transparent;
  border: none;
  width: 100%;
  max-width: 300px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

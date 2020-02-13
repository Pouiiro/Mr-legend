import React, { useContext } from 'react'
import { MrLegendContext } from 'providers/AppProvider'
import styled from 'styled-components'
import { ParallaxLayer } from 'react-spring/renderprops-addons'
import Slider from 'react-slick'
import { ContainerS, Title1, CDiv } from 'global/styles'
import 'global/btn.css'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody
} from 'shards-react'

const GInfo = ({ myRef }) => {
  const { state } = useContext(MrLegendContext)
  let owoish
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
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
          arrows: false,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false
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
  const rend = state.gameData.map((element, index) => {
    if (Array.isArray(element.incidents) && element.incidents.length) {
      owoish = false
    } else {
      owoish = true
    }

    return (
      <div key={index}>
        <CDiv>
          <Cardu>
            <Cheader>{element.name}</Cheader>
            <Cimg src={require(`assets/images/mg${index}.png`)} />
            <Cbody>
              <Ctitle
                style={
                  element.status === 'online'
                    ? { color: 'green' }
                    : { color: 'red' }
                }
              >
                {element.status}
              </Ctitle>
              {owoish
                ? 'No Notifications | All Good'
                : 'No Notifications | All Good'
              // : element.incidents.map(value =>
              //     value.updates.map(x => <p key={x.id}>{x.content}</p>)
              //   )
              }
            </Cbody>
          </Cardu>
        </CDiv>
      </div>
    )
  })

  return (
    <>
      <ParallaxLayer factor={0.1} offset={1.2} speed={-3} style={style}>
        <Title1>Status of the game</Title1>
      </ParallaxLayer>
      <ParallaxLayer factor={0.5} offset={1.2} speed={3} style={style}>
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
                {rend}
              </Slider>
            </Col>
          </Row>
        </ContainerS>
      </ParallaxLayer>
    </>
  )
}

export default GInfo

const Ctitle = styled(CardTitle)`
  text-align: center;
`

const Cbody = styled(CardBody)`
  background: black;
  color: white;
  width: 230px;
  margin-left: auto;
  margin-right: auto;
  border-bottom-left-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  box-shadow: 12px 18px 23px -4px rgba(0, 0, 0, 0.68);
`

const Cimg = styled(CardImg)`
  width: 300px;
  height: 180px;
  margin-left: auto;
  margin-right: auto;
  border: 5px black solid;
  border-bottom-left-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
  box-shadow: 12px 18px 23px -4px rgba(0, 0, 0, 0.68);
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const Cheader = styled(CardHeader)`
  background-color: black;
  color: white;
  text-align: center;
  border-top-left-radius: 5px !important;
  border-top-right-radius: 5px !important;
  font-family: 'Poppins', sans-serif !important;
  letter-spacing: 2px;
  box-shadow: 12px 18px 23px -4px rgba(0, 0, 0, 0.68);
`

const Cardu = styled(Card)`
  background-color: transparent;
  border: none;
  width: 100%;
  max-width: 300px;
`

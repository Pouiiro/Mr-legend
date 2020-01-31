import React, { useContext } from 'react'
import { MrLegendContext } from 'providers/AppProvider'

import styled from 'styled-components'
import { Parallax } from 'react-parallax'
import bg2 from 'assets/images/bg2.jpg'
import { Div2, Title1 } from 'global/styles'

import 'global/btn.css'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody
} from 'shards-react'

const GInfo = () => {
  const { state } = useContext(MrLegendContext)
  let owoish

  const rend = state.gameData.map((element, index) => {
    if (Array.isArray(element.incidents) && element.incidents.length) {
      owoish = false
    } else {
      owoish = true
    }
    return (
      <Col key={index}>
        <Cardu
          style={{
            maxWidth: '300px',
            backgroundColor: '#0000',
            border: 'none'
          }}
        >
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
              : element.incidents.map(value =>
                  value.updates.map(x => <p key={x.id}>{x.content}</p>)
                )}
          </Cbody>
        </Cardu>
      </Col>
    )
  })

  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={bg2}
      bgImageAlt="league scenery"
      strength={-200}
    >
      <Div2>
        <Title1>Status of the game</Title1>
        <Container style={{ maxWidth: '1500px' }}>
          <Row>{rend}</Row>
        </Container>
      </Div2>
    </Parallax>
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
  margin-bottom: 10vh;
  @media only screen and (max-width: 600px) {
    /* margin-bottom: 5vh; */
    width: 100%;
    margin: 3vh auto;
  }
`

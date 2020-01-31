import React, { useContext } from 'react'
import styled from 'styled-components'
import { Parallax } from 'react-parallax'
import bg3 from 'assets/images/bg3.jpg'
import { Div2, Title1 } from 'global/styles'
import 'global/btn.css'
import { Container, Row, Col, Card, CardHeader, CardImg } from 'shards-react'
import { MrLegendContext } from 'providers/AppProvider'

const Cinfo = () => {
  const { state } = useContext(MrLegendContext)

  const rotation = state.rotationChamps
  const champs = state.champData

  const frir = rotation.map(element => {
    const obj = champs.find(obj => obj.key === element.toString())
    return (
      <Col key={obj.key}>
        <Cardu
          style={{
            maxWidth: '300px',
            backgroundColor: '#0000',
            border: 'none'
          }}
        >
          <Cheader>{obj.name}</Cheader>
          <Cimg
            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${obj.id}_0.jpg`}
          />
        </Cardu>
      </Col>
    )
  })

  return (
    <Parallax blur={0} bgImage={bg3} bgImageAlt="league scenery" strength={200}>
      <Div2>
        <Title1>Champion Rotations</Title1>
        <Container style={{ maxWidth: '1500px' }}>
          <Row>{frir}</Row>
        </Container>
      </Div2>
    </Parallax>
  )
}
export default Cinfo

const Cheader = styled(CardHeader)`
  background-color: black;
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
`

const Cardu = styled(Card)`
  margin-bottom: 10vh;
  @media only screen and (max-width: 600px) {
    /* margin-bottom: 5vh; */
    width: 100%;
    margin: 3vh auto;
  }
`

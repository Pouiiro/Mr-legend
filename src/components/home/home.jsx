import React from 'react'
import styled from 'styled-components'
import { Parallax } from 'react-parallax'
import gnr from 'assets/images/input.png'
import bg1 from 'assets/images/bg1.jpg'
import bg2 from 'assets/images/bg2.jpg'
import bg3 from 'assets/images/bg3.jpg'
import logo from 'assets/images/cover3.png'
import './btn.css'

const Home = () => {
  return (
    <Container>
      <Parallax bgImage={bg1} strength={500}>
        <Div style={{ height: '700px' }}>
          <Div1>
            <Title>
              Welcome To <br />
              <Img src={logo} />
            </Title>
            <Input type="text" placeholder="Please input your IGN" />
            <ButtonD>
              <Button className="btn btn-white btn-				 animate" href="#">
                Let's Go
              </Button>
            </ButtonD>
            <Img1 src={gnr} />
          </Div1>
        </Div>
      </Parallax>
      <Parallax
        blur={{ min: -15, max: 15 }}
        bgImage={bg2}
        bgImageAlt="league scenery"
        strength={-200}
      >
        <Div style={{ height: '500px' }}>Dummy</Div>
      </Parallax>
      <Parallax
        blur={0}
        bgImage={bg3}
        bgImageAlt="league scenery"
        strength={200}
      >
        <Div style={{ height: '500px' }}>Dummy</Div>
      </Parallax>
    </Container>
  )
}

export default Home

const Container = styled.div`
  margin: 0;
  height: 100vh;
`
const Div = styled.div`
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 25vh;
  @media only screen and (max-width: 600px) {
    margin-top: 8vh;
  }
`
const Div1 = styled(Div)`
  margin: 0 auto;
  width: 80%;
  height: 100%;
`

const Input = styled.input`
  background: rgba(255, 255, 255, 0.4);
  border: none;
  position: relative;
  display: block;
  outline: none;
  text-align: center;
  border-radius: 7px;
  width: 50%;
  height: 50px;
  top: 200px;
  margin: 0 auto;
  padding: 10px;
  color: #000000;

  -webkit-box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.5);
  box-shadow: 0 2px 10px 1px rgba(0, 0, 0, 0.5);

  ::-webkit-input-placeholder {
    color: #666;
  }
  :-moz-placeholder {
    color: #666;
  }
  ::-moz-placeholder {
    color: #666;
  }
  :-ms-input-placeholder {
    color: #666;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
const Title = styled.h1`
  font-size: 50px;
  position: relative;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  top: 20%;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    font-size: 40px;
    margin-bottom: 5vh;
  }
`
const Img = styled.img`
  width: 35%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
const Img1 = styled.img`
  @media only screen and (max-width: 600px) {
    margin-top: 8vh;
    margin-left: -15vw;
    width: 100%;
  }
`

const ButtonD = styled.div`
  position: relative;
  text-transform: uppercase;
  width: 160px;
  top: 31%;
  margin: 0 auto;
`

const Button = styled.a`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
`

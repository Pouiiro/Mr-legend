import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ContainerS = styled.div`
  margin: 0;
  height: 100vh;
`
export const Div = styled.div`
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 20vh;
  @media only screen and (max-width: 600px) {
    margin-top: 8vh;
  }
`
export const Div1 = styled(Div)`
  margin: 0 auto;
  width: 80%;
  height: 100%;
`

export const Div2 = styled(Div)`
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 0vh;
  height: auto;
  @media only screen and (max-width: 600px) {
    margin-top: 0vh;
  }
`

export const Input = styled.input`
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
    color: #000000;
  }
  :-moz-placeholder {
    color: #000000;
  }
  ::-moz-placeholder {
    color: #000000;
  }
  :-ms-input-placeholder {
    color: #000000;
  }
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
export const Title = styled.h1`
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
export const Title1 = styled(Title)`
  margin-bottom: 8vh;
  margin-top: 5%;
  color: white;
  mix-blend-mode: difference;
  @media only screen and (max-width: 600px) {
    font-size: 40px;
    margin-bottom: 5vh;
  }
`

export const Img = styled.img`
  width: 35%;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`
export const Img1 = styled.img`
  @media only screen and (max-width: 600px) {
    margin-top: 8vh;
    margin-left: -15vw;
    width: 100%;
  }
`

export const ButtonD = styled.div`
  position: relative;
  text-transform: uppercase;
  width: 160px;
  top: 34%;
  margin: 0 auto;
`

export const ButtonS = styled(Link)`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
`

import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, CardHeader, CardImg } from 'shards-react'

export const ContainerS = styled(Container)`
  margin-top: 10vh;
  @media only screen and (max-width: 600px) {
    margin-top: 10vh;
  }
`

export const CDiv = styled.div`
  width: auto;
  padding: 50px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    padding: 25px 20px;
  }
`

export const Input = styled.input`
  background: rgba(255, 255, 255, 0.4);
  border: none;
  outline: none;
  text-align: center;
  border-radius: 7px;
  width: 40%;
  height: 50px;
  margin-right: auto;
  margin-left: auto;
  padding: 5px;
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
    width: 80%;
  }
`
export const Title = styled.h1`
  font-size: 50px;
  text-transform: uppercase;
  width: 100%;
  text-align: center;
  @media only screen and (max-width: 600px) {
    font-size: 40px;
    margin-bottom: 5vh;
  }
`
export const Title1 = styled(Title)`
  color: white;
  mix-blend-mode: difference;
  @media only screen and (max-width: 600px) {
    font-size: 30px;
  }
`

export const Img = styled.img`
  width: 30rem;
  height: auto;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 600px) {
    width: 13rem;
    height: 3rem !important;
  }
`

export const ButtonD = styled.div`
  text-transform: uppercase;
  width: 160px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ButtonS = styled(Link)`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 600;
`

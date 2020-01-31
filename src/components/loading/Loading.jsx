import React from 'react'
// import { SemipolarLoading } from 'react-loadingg'
import { TouchBallLoading } from 'react-loadingg'
import HangOn from 'assets/images/loading.png'
import styled from 'styled-components'

const Loading = () => {
  return (
    <Div>
      <Img src={HangOn} />
      <TouchBallLoading color="#9257ff" size="large" />

      <H1>Hol' Up!</H1>
      <H2>(￣ヘ￣)</H2>
    </Div>
  )
}

export default Loading

const H1 = styled.h1`
  align-self: center;
  margin-right: auto;
  margin-left: auto;
  margin-top: -10vh;
  margin-bottom: auto;
`
const H2 = styled(H1)`
  margin-top: -20vh;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  @media screen and (max-width: 430px) {
    flex-direction: column;
  }
`
const Img = styled.img`
  margin-right: auto;
  margin-left: auto;
  margin-top: 20vh;
  margin-bottom: auto;
  @media screen and (max-width: 430px) {
    width: 70%;
    margin-right: auto;
    margin-left: auto;
    margin-top: 15vh;
    margin-bottom: auto;
  }
`

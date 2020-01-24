import React from 'react'
// import styled from 'styled-components'
import { Parallax } from 'react-parallax'
import {
  Div,
  Div1,
  Title,
  Img,
  Input,
  ButtonD,
  ButtonS,
  Img1
} from 'global/styles'
import gnr from 'assets/images/input.png'
import logo from 'assets/images/cover3.png'
import bg1 from 'assets/images/bg1.jpg'

const Intro = ({ inputUser, getUserdata, state }) => {
  return (
    <Parallax bgImage={bg1} strength={500}>
      <Div style={{ height: '720px' }}>
        <Div1>
          <Title>
            <Img src={logo} />
          </Title>
          <Input
            onChange={e => {
              inputUser(e.target.value)
            }}
            type="text"
            placeholder="SUMMONER NAME"
          />
          <ButtonD>
            <ButtonS
              onClick={e => {
                e.preventDefault()
                console.log(state)
              }}
              className="btn btn-white btn-				 animate"
              href=""
            >
              Let's Go
            </ButtonS>
          </ButtonD>
          <Img1 src={gnr} />
        </Div1>
      </Div>
    </Parallax>
  )
}

export default Intro

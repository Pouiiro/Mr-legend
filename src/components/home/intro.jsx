import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Parallax } from 'react-parallax'
import { MrLegendContext } from 'providers/appProvider'
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

const Intro = () => {
  const { user, setUser } = useContext(MrLegendContext)
  let summoner = ''
  const inputUser = () => {
    setUser({ ...user, currentUser: summoner })
  }
  return (
    <Parallax bgImage={bg1} strength={500}>
      <Div style={{ height: '720px' }}>
        <Div1>
          <Title>
            <Img src={logo} />
          </Title>
          <Input
            onChange={e => {
              user = e.target.value
            }}
            type="text"
            placeholder="SUMMONER NAME"
          />
          <ButtonD>
            <ButtonS
              onClick={e => {
                e.preventDefault()
                inputUser()
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

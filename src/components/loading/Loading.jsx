import React, { useState, useEffect } from 'react'
import HangOn from 'assets/images/loading.png'
import HangOn2 from 'assets/images/loading2.png'
import HangOn3 from 'assets/images/loading3.png'
import styled from 'styled-components'
import FadeIn from 'react-fade-in'

const Loading = () => {
  const images = [HangOn, HangOn2, HangOn3]

  const [principalImage, setPrincipalImage] = useState(
    Array.isArray(images) && images.length > 0 ? images[0] : null
  )

  useEffect(() => {
    let counter = 0
    let intervalSetClass

    if (Array.isArray(images) && images.length > 1) {
      intervalSetClass = setInterval(() => {
        setPrincipalImage(images[counter])
        counter += 1
        if (counter === images.length) {
          counter = 0
        }
      }, 800)
    }

    return () => {
      clearInterval(intervalSetClass)
    }
  }, [])
  return (
    <FadeIn>
      <Div>
        <H1>Fetching Data...</H1>
        <Containers>
          <Img id="img" src={principalImage} />
          <H1s>
            <span></span>
            <span></span>
            <span></span>
          </H1s>
        </Containers>
      </Div>
    </FadeIn>
  )
}

export default Loading

const H1 = styled.h1`
  text-transform: uppercase;
  font-family: 'Roboto';
  animation-name: blinker;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  @keyframes blinker {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const H1s = styled.div`
  position: absolute;
  bottom: 200px;
  right: 35px;
  color: white;
  font-size: 6rem;
  max-width: 100%;
  max-height: 100%;
  span {
    height: 19px;
    animation-name: blink;
    animation-duration: 1.4s;
    animation-iteration-count: infinite;
    animation-fill-mode: both;
    width: 19px;
    background-color: black;
    border-radius: 50%;
    display: inline-block;
    margin: 4px;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @media screen and (max-width: 600px) and (min-width: 361px) {
    bottom: 80px;
    right: 30vw;
    color: white;
    font-size: 6rem;
    span {
      height: 6px;
      width: 6px;
      display: inline-block;
      margin: 2px;
    }
  }
  @media screen and (max-width: 361px) and (min-width: 300px) {
    bottom: 82px;
    right: 28vw;
    color: white;
    font-size: 6rem;
    span {
      height: 6px;
      width: 6px;
      display: inline-block;
      margin: 2px;
    }
  }
  @keyframes blink {
    0% {
      opacity: 0.2;
    }

    20% {
      opacity: 1;
    }

    100% {
      opacity: 0.2;
    }
  }
`

const Containers = styled.div`
  position: relative;
`
const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin-right: auto;
  display: block;
  margin-left: auto;
  @media screen and (max-width: 430px) {
    width: 50%;
  }
`

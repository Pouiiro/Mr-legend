import React from 'react'
import styled from 'styled-components'
import logo from 'assets/images/cover.png'
import logo1 from 'assets/images/cover2.png'

const Brand = () => {
  return (
    <Link href="#">
      <Image
        src={logo}
        alt="Mr Wii"
        onMouseOver={e => (e.currentTarget.src = logo1)}
        onMouseOut={e => (e.currentTarget.src = logo)}
      />
    </Link>
  )
}

export default Brand

const Link = styled.a`
  width: 15%;
  height: auto;
  margin: auto 0;
  @media only screen and (max-width: 600px) {
    height: auto;
    width: 50%;
  }
`

const Image = styled.img`
  width: 100%;
  @media only screen and (max-width: 600px) {
    width: 120%;
  }
`

import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import { NavLink } from 'react-router-dom'
import Brand from './Brand'
import BurgerMenu from './BurgerMenu'
import CollapseMenu from './CollapseMenu'

export const useScrollHandler = () => {
  const [scroll, setScroll] = useState(true)
  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY < 10
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck)
      }
    }
    document.addEventListener('scroll', onScroll)
    return () => {
      document.removeEventListener('scroll', onScroll)
    }
  }, [scroll, setScroll])

  return scroll
}

const Navbar = () => {
  const scroll = useScrollHandler()
  const [nav, setNav] = useState(false)
  const owo = () => {
    setNav(!nav)
  }

  const barAnimation = useSpring(
    scroll === true
      ? {
          from: { transform: 'translate3d(0, -10rem, 0)' },
          transform: 'translate3d(0, 0, 0)',
          backgroundColor: '#0000',
          transition: '0.1s ease in'
        }
      : {
          from: { transform: 'translate3d(0, -10rem, 0)' },
          transform: 'translate3d(0, 0, 0)',
          backgroundColor: 'white',
          transition: '0.5s ease out'
        }
  )

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly
  })
  const styleAc = { color: '#8e16ff' }

  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            <NavLink activeStyle={styleAc} to="/" exact>
              Home
            </NavLink>
            <NavLink activeStyle={styleAc} to="/profile" exact>
              Profile
            </NavLink>
            <NavLink activeStyle={styleAc} to="/ranking" exact>
              Ranking
            </NavLink>
            <Span />
            <NavLink activeStyle={styleAc} to="/about" exact>
              About
            </NavLink>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu navbarState={nav} handleNavbar={owo} />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu navbarState={nav} handleNavbar={owo} />
    </>
  )
}

export default Navbar

const Span = styled.span`
  border-right: 1px solid #333;
  margin: 0 1rem;
  @media (max-width: 768px) {
    display: none;
  }
`

const NavBar = styled(animated.nav)`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  font-size: 1.3rem;
  @media (max-width: 768px) {
    background: #fff;
  }
`

const FlexContainer = styled.div`
  max-width: 100rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;
  justify-content: space-between;
  height: 5rem;
`

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #000000;
    font-family: 'Roboto Condensed', sans-serif;
    font-style: normal;
    font-weight: 700;
    text-transform: uppercase;
    border-bottom: 1px solid transparent;
    margin: 0 1.2rem;
    transition: 200ms linear 0s;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #000000;
      border-bottom: 1px solid #9858e9;
    }

    @media (max-width: 768px) {
      display: none;
    }
  }
`

const BurgerWrapper = styled.div`
  margin: auto 0;

  @media (min-width: 769px) {
    display: none;
  }
`

import React from 'react'
import styled from 'styled-components'
import { useSpring, animated, config } from 'react-spring'
import { NavLink } from 'react-router-dom'

import Brand from './Brand'
import BurgerMenu from './BurgerMenu'
import CollapseMenu from './CollapseMenu'

const Navbar = props => {
  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)'
  })

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly
  })
  const styleAc = { color: 'black' }
  return (
    <>
      <NavBar style={barAnimation}>
        <FlexContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            <NavLink activeStyle={styleAc} to="/" exact>
              Home
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
            <BurgerMenu
              navbarState={props.navbarState}
              handleNavbar={props.handleNavbar}
            />
          </BurgerWrapper>
        </FlexContainer>
      </NavBar>
      <CollapseMenu
        navbarState={props.navbarState}
        handleNavbar={props.handleNavbar}
      />
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
  background: #0000;
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
  height: 7rem;
`

const NavLinks = styled(animated.ul)`
  justify-self: end;
  list-style-type: none;
  margin: auto 0;

  & a {
    color: #732a9e;
    font-family: 'Roboto Condensed', sans-serif;
    font-style: normal;
    font-weight: 500;
    text-transform: uppercase;
    border-bottom: 1px solid transparent;
    margin: 0 1.2rem;
    transition: all 300ms linear 0s;
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

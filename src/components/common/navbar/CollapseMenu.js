import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'

const CollapseMenu = ({ navbarState, handleNavbar }) => {
  const { open } = useSpring({ open: navbarState ? 0 : 1 })
  const styleAc = {
    color: '#000000',
    fontSize: '1rem',
    lineHeight: '2',
    fontWeight: '600'
  }
  if (navbarState === true) {
    return (
      <CollapseWrapper
        onClick={handleNavbar}
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, 0, 0, -200]
            })
            .interpolate(openValue => `translate3d(0, ${openValue}px, 0`),
          zIndex: '1'
        }}
      >
        <NavLinks>
          <li>
            <NavLink activeStyle={styleAc} to="/" exact>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={styleAc} to="/profile" exact>
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink activeStyle={styleAc} to="/about" exact>
              About
            </NavLink>
          </li>
        </NavLinks>
      </CollapseWrapper>
    )
  }
  return null
}

export default CollapseMenu

const CollapseWrapper = styled(animated.div)`
  background: #fff;
  position: fixed;
  top: 0rem;
  left: 0;
  right: 0;
  height: 200px;
`

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 2rem 1rem 2rem 2rem;
  margin-top: 3rem;

  & li {
    transition: all 500ms linear 0s;
  }

  & a {
    font-size: 1rem;
    font-weight: 600;
    line-height: 2;
    color: #676767;
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }
`

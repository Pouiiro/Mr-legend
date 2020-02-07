import styled from 'styled-components'

export const ButtonS = styled.button`
  align-self: center;
  cursor: pointer;
  background: transparent;
  padding: 1rem 1rem;
  margin: 0 1rem;
  margin-top: 1rem;
  transition: all 0.5s ease;
  color: white;
  font-size: 1.5rem;
  letter-spacing: 1px;
  outline: none;
  box-shadow: 20px 38px 34px -26px rgba(255, 255, 255, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: solid 2px black;
  transition: 0.4s ease-out;

  :focus {
    outline: 0;
  }
  :active {
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.2);
  }
`

export const ButtonL = styled.a`
  display: block;
  position: relative;
  float: left;
  width: 120px;
  cursor: pointer;
  padding: 0;
  margin: 10px 20px 10px 0;
  font-weight: 600;
  text-align: center;
  line-height: 50px;
  color: #fff;
  border-radius: 5px;
  transition: all 0.3s;
  background: 0;
  .top {
    position: absolute;
    top: 0px;
    left: 0;
    width: 120px;
    height: 50px;
    color: #fff;
    border-radius: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
    transition: all 0.2s;
    border-radius: 5px;
  }
  .bottom {
    position: absolute;
    top: 0;
    left: 0;
    width: 120px;
    height: 50px;
    color: rgba(0, 0, 0, 0);
    z-index: 5;
    border-radius: 5px;
  }

  :hover .top {
    top: 40px;
  }
  :hover .bottom {
    color: #fff;
  }
`

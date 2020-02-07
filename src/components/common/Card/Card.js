import styled from 'styled-components'
import { Card, CardHeader } from 'shards-react'

// Match History Card

export const MyCard = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 300px;
  height: 350px;
  color: white;
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  border-radius: 2px;
  transition: 0.4s ease-out;

  cursor: pointer;
  :hover {
    transform: translateY(-20px);
  }
`
export const CardKarada = styled.div`
  flex-wrap: nowrap;
  flex-direction: column;
  display: flex;
`

export const MyCardImg = styled.img`
  width: 40%;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  margin: 2vh auto;
`

export const MyCardH1 = styled.h1`
  color: white;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 32px;
  font-family: 'Roboto', sans-serif;
`

export const MyCardLast = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  margin: 1vw 0;
`

export const MyCardLastOne = styled.div`
  width: 50%;
  margin-top: 1rem;
  h4 {
    text-align: left;
    font-size: 17px;
    margin-left: 1rem;
  }
`

export const MyCardLastTwo = styled.div`
  width: 50%;
  margin-top: 1rem;

  h4 {
    text-align: right;
    font-size: 17px;
    margin-right: 0.5rem;
  }
`

// Champions Mastery Card

export const Cheader = styled(CardHeader)`
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgb(255, 255, 255);
  font-weight: 800;
  font-size: 18px;
  border: none;
  text-align: center;
  font-family: 'Poppins', sans-serif !important;
  letter-spacing: 2px;
`

export const Cardu = styled(Card)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: right;
  height: 380px;
  width: 300px;
  text-align: center;
  border: none;
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  /* border-radius: 10px; */
  /* box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); */
  a {
    padding: 0.5rem;
    font-size: 25px;
    font-weight: 900;
    margin-right: auto;
    margin-left: auto;
    color: rgb(1, 255, 255) !important;
    background-color: #159e9e8a;
    cursor: pointer;
    width: 65%;
    transition: 0.25s ease;
    border-radius: 5%;
  }
  a:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 0, 0.1);
    color: #09fdc0 !important;
    border-color: transparent;
    background-color: transparent;
  }
  h2 {
    color: rgb(255, 255, 255);
    text-align: left;
    font-size: 15px;
    margin-top: 11.5rem;
  }
  .Ctitle {
    color: rgb(255, 230, 0);
    font-family: fantasy;
  }
  .Cbot {
    text-align: left;
    font-size: 15px;
    color: white;
  }
  @media only screen and (max-width: 600px) {
    height: 280px;
    width: 260px;
    h2 {
      margin-top: 7rem;
    }
    a {
      width: 100%;
      margin-right: 0;
    }
  }
`

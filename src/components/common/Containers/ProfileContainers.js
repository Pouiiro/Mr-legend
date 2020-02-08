import styled from 'styled-components'
import { Container, Col } from 'shards-react'

export const Containerr = styled(Container)`
  transition: 1s ease;
  margin-top: 10vh;
  padding-right: 10%;
  padding-left: 10%;
  @media screen and (max-width: 600px) {
    padding-right: 0;
    padding-left: 0;
  }
`

export const Cstat = styled.div`
  display: flex;
  flex: 1;
  width: 500px;
  flex-wrap: wrap;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`
//

export const MyCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
export const MyCol1 = styled(MyCol)`
  justify-content: center;
`
export const MyCol2 = styled(MyCol)`
  justify-content: center;
  flex-direction: column;
`

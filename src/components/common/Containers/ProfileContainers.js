import styled from 'styled-components'
import { Container, Col } from 'shards-react'

export const Containerr = styled(Container)`
  transition: 1s ease;
  margin-top: 15vh;
  padding-right: 90px;
  padding-left: 90px;
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

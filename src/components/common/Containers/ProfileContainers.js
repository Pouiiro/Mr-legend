import styled from 'styled-components'
import { Container, Col } from 'shards-react'

export const Containerr = styled(Container)`
  margin-top: 10vh;
  @media screen and (max-width: 600px) {
    margin-top: 6vh;
  }
`

export const Cstat = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  flex-wrap: wrap;
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

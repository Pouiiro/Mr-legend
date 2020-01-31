import React, { useEffect, useContext, useCallback, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { MrLegendContext } from 'providers/AppProvider'

import ReactCardCarousel from 'react-card-carousel'
import { ContainerS } from 'global/styles'
import styled from 'styled-components'
import FadeIn from 'react-fade-in'
import Loading from '../loading/Loading'
import more from '../../assets/images/more.png'
import './temp.css'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter
} from 'shards-react'

export default () => {
  const [loadingS, setLoadingS] = useState(true)
  const [moreC, setMore] = useState(6)
  const { setDark, state, user, setState } = useContext(MrLegendContext)

  const champs = state.champData
  const getCharacter = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:3001/summoner?name=${user}`
      )
      setState(prevState => ({
        ...state,
        SummonerData: {
          playerData: data[0],
          rankData: data[2],
          champData: data[1],
          matchH: data[3],
          matchHs: data[4]
        }
      }))

      setLoadingS(false)
      setDark(true)
    } catch (err) {
      console.log(err)
    }
  }, [user])

  useEffect(() => {
    getCharacter()
  }, [getCharacter])

  const matchH = state.SummonerData.matchH
  const sMatch = state.SummonerData.matchHs

  const arrParti = []
  const wiwi = sMatch.map(function(ind) {
    const iwi = ind.map(owo => owo.player.summonerId)
    const uwu = ind.map(x => x.participantId)
    const num1 = uwu
    const num2 = iwi
    num1.forEach(function(v, i) {
      const obj = []
      obj.participantId = v
      obj.summonerId = num2[i]
      arrParti.push(obj)
    })
  })

  const pId = arrParti.filter(ew => {
    const ss = ew.summonerId === state.SummonerData.playerData.id
    return ss
  })

  const partic = matchH.map(x => x.participants)
  const filteredParti = []
  const awi = partic.forEach((element, i) => {
    const owo = element.find(x => x.participantId === pId[i].participantId)
    filteredParti.push(owo)
  })

  const hesus = filteredParti.map(ex => {
    const bData = {
      champ: ex.championId,
      sum1: ex.spell1Id,
      sum2: ex.spell2Id,
      win: ex.stats.win,
      k: ex.stats.kills,
      d: ex.stats.deaths,
      a: ex.stats.assists,
      cs: ex.stats.totalMinionsKilled
    }
    return bData
  })

  const wholeData = hesus.map(xs => {
    const obj = champs.find(x => x.key === xs.champ.toString())
    return { name: obj.id, ...xs }
  })
  const printData = wholeData.map((xxx, i) => {
    const bgWin = {
      backgroundImage: `linear-gradient(rgba(0, 255, 76, 0.2), rgba(0, 255, 76, 0.2)),url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${xxx.name}_1.jpg)`
    }
    const bgLose = {
      backgroundImage: `linear-gradient(rgba(255, 0, 0, 0.2), rgba(255, 0, 0, 0.2)),url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${xxx.name}_1.jpg)`
    }
    return (
      <Col xl key={i}>
        <MyCard style={xxx.win ? bgWin : bgLose}>
          <MyCardImg
            src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${xxx.name}.png`}
          />
          <MyCardH1> {xxx.win ? 'Victory' : 'Defeat'}</MyCardH1>
          <MyCardLast>
            <MyCardLastOne>
              <h4>{xxx.cs} Cs/Minute</h4>
              <h4>KDA {`${xxx.k}/${xxx.d}/${xxx.a}`}</h4>
            </MyCardLastOne>
            <MyCardLastTwo></MyCardLastTwo>
          </MyCardLast>
        </MyCard>
      </Col>
    )
  })
  const rank = state.SummonerData.rankData.map(data => {
    let tier = []
    let tierN = []
    let lp = []
    let wins = []
    let loses = []
    let type = []
    let wr = []
    tier = data.tier
    tierN = data.rank
    lp = data.leaguePoints
    wins = data.wins
    loses = data.losses
    type = data.queueType
    wr = (wins / (wins + loses)) * 100
    return {
      tier: tier,
      rank: tierN,
      lp: lp,
      wins: wins,
      losses: loses,
      qType: type,
      wr: wr
    }
  })

  const mainChamps = state.SummonerData.champData.map(champ => ({
    champid: champ.championId,
    lvl: champ.championLevel,
    champP: champ.championPoints
  }))

  const sortedChamps = mainChamps.sort(function(a, b) {
    return b.lvl - a.lvl
  })

  const slicedChamps = sortedChamps.slice(0, moreC)
  const addMore = () => setMore(moreC + 4)

  const awoo = slicedChamps.map(element => {
    const obj = champs.find(x => x.key === element.champid.toString())
    const newobj = { ...element, ...obj }
    const socc = newobj.champP
    const imgs = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${newobj.id}_2.jpg`
    const succ =
      Math.abs(socc) > 999
        ? Math.sign(socc) * (Math.abs(socc) / 1000).toFixed(1) + 'k'
        : Math.sign(socc) * Math.abs(socc)
    return (
      <Cardu
        key={newobj.key}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
            imgs +
            ')'
        }}
      >
        <Cheader className="Cheader">{newobj.id}</Cheader>
        <CardBody className="Cbody">
          <CardTitle className="Ctitle">{newobj.title}</CardTitle>
          <h2> Mastery {newobj.lvl}</h2>
          <CardFooter className="cbot">{succ} Mastery Points</CardFooter>
        </CardBody>
      </Cardu>
    )
  })

  return (
    <div>
      {loadingS ? (
        <FadeIn>
          <Loading />
        </FadeIn>
      ) : (
        <Main>
          <FadeIn>
            <Container className="Container">
              <Pdiv className="Pdiv" id="pfp">
                <H1 className="H1">{state.SummonerData.playerData.name}</H1>
                <Pl className="P1">
                  <Pfp
                    className="Pfp"
                    id="img"
                    src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/${state.SummonerData.playerData.profileIconId}.png`}
                  />
                  <span>Lvl {state.SummonerData.playerData.summonerLevel}</span>
                </Pl>
              </Pdiv>
              <Rdiv>
                <H4 className="H4">
                  {rank[0].tier + ' ' + rank[0].rank + ' ' + rank[0].lp}LP
                </H4>
                <Rp
                  src={require(`../../assets/rankedLogos/${rank[0].tier}.png`)}
                />
                <H4>
                  {rank[0].wins}W | {rank[0].losses}L
                </H4>
                <H5>Win Ratio {Math.round(rank[0].wr)}%</H5>
              </Rdiv>
              <Cstat>
                <ReactCardCarousel disable_keydown={false}>
                  {awoo}
                  <Cardu
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
                        more +
                        ')'
                    }}
                  >
                    <CardBody className="Cbody">
                      <a className="load" onClick={() => addMore()}>
                        Load More
                      </a>
                    </CardBody>
                  </Cardu>
                </ReactCardCarousel>

                {/* <Col>
                  <Arrow id="btn" onClick={() => expand()} className="arrow">
                    Show More
                  </Arrow>
                </Col> */}
              </Cstat>
              <Mdiv>
                <Row>{printData} </Row>
              </Mdiv>
            </Container>
          </FadeIn>
        </Main>
      )}
    </div>
  )
}

const MyCard = styled.div`
  display: flex;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 300px;
  height: 350px;
  border: none;
  color: white;
  border-radius: 10%;
  margin-top: 3vh;
  /* margin-left: auto;
  margin-right: auto; */
`

const MyCardImg = styled.img`
  width: 40%;
  border-radius: 10%;
  margin: 2vh auto;
`
const MyCardH1 = styled.h1`
  color: white;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-size: 32px;
  font-family: 'Roboto', sans-serif;
`

const MyCardLast = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 100%;
  margin: 1vw 0;
`
const MyCardLastOne = styled.div`
  width: 50%;
  margin-top: 2rem;
  h4 {
    text-align: left;
    font-size: 17px;
    margin-left: 1rem;
  }
`

const MyCardLastTwo = styled.div`
  width: 50%;
  text-align: right;
  font-size: 14px;
`

const Main = styled.div`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://d3gz42uwgl1r1y.cloudfront.net/fi/fireflufferz/submission/2016/05/015f94d8c6b0bbe38b110b54c88094ef/2500x1500.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  overflow-y: hidden;
`

const Container = styled.div`
  box-sizing: border-box;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  transition: 1s ease;
  margin: 10vh 5vw 0vh;
  @media screen and (max-width: 600px) {
    flex-direction: column;
    margin-top: 10vh;
  }
`

const Pdiv = styled.div`
  transition: 1s ease;
  margin-top: 2vh;
  width: 20%;
  height: 40vh;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin: 0 auto;
  }
`

const Rdiv = styled.div`
  color: #09fdc0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  height: 40vh;
  width: 40%;
  @media screen and (max-width: 600px) {
    width: 100%;
    margin-top: 3vh;
    margin-bottom: 3vh;
    flex-direction: column;
    flex-wrap: nowrap;
  }
`

const Cstat = styled.div`
  position: relative;
  height: 40vh;
  width: 40%;
  display: flex;
  flex: 1;
  justify-content: right;
  flex-wrap: wrap;
  align-items: middle;
  @media (max-width: 600px) {
    width: 100%;
    margin: 0 auto;
    margin-top: 5vh;
    margin-bottom: 5vh;
    flex-direction: column;
  }
`

const Mdiv = styled.div`
  width: 100%;
  height: 50vh;
  background-color: rgba(0, 0, 0, 0.329);
  border-radius: 10px;
`

const Cheader = styled(CardHeader)`
  background-color: rgba(0, 0, 0, 0) !important;
  color: rgb(255, 255, 255);
  font-weight: 800;
  font-size: 18px;
  border: none;
  text-align: center;
  font-family: 'Poppins', sans-serif !important;
  letter-spacing: 2px;
`

const Cimg = styled(CardImg)`
  margin-top: 5vw;
  margin-left: auto;
  margin-right: auto;
  height: 400px;
  width: 300px;
  border: none;
`

const Cardu = styled(Card)`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 350px;
  width: 370px;
  text-align: center;
  border: none;
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  border-radius: 10px;
  a {
    padding: 0.5rem;
    font-size: 25px;
    font-weight: 900;
    margin-right: 10rem;
    color: rgb(1, 255, 255) !important;
    background-color: #159e9e8a;
    cursor: pointer;
    width: 45%;
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
  @media only screen and (max-width: 600px) {
    height: 300px;
    width: 280px;
    h2 {
      margin-top: 7rem;
    }
    a {
      width: 100%;
      margin-right: 0;
    }
  }
`

const Pl = styled.div`
  position: relative;
  text-align: center;
  color: white;
`

const H1 = styled.h1`
  margin-top: 5px;
  margin-bottom: 2rem;
  text-align: center;
  color: white;
  letter-spacing: 2px;
`

const Pfp = styled.img`
  border-radius: 80px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: 150px;
  height: auto;
`
const Rp = styled.img`
  width: 100%;
  max-width: 150px;
  height: auto;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const H4 = styled.h4`
  text-align: center;
  width: 30%;
`
const H5 = styled.h4`
  width: 100%;
  text-align: center;
  margin-top: -7rem;
  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
    text-align: center;
  }
`

import React, { useEffect, useContext, useCallback, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { MrLegendContext } from 'providers/AppProvider'
import ReactCardCarousel from 'react-card-carousel'
import styled from 'styled-components'
import Loading from '../loading/Loading'
import more from '../../assets/images/more.png'
import { Div } from 'global/styles'
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter
} from 'shards-react'

var s = 0
var e = 5

export default () => {
  const [loadingS, setLoadingS] = useState(true)
  const [moreC, setMore] = useState(6)
  const { state, user, setState } = useContext(MrLegendContext)
  const [sRank, setRank] = useState(0)
  const [gamesu, setGamsu] = useState(false)
  const [miniLoad, setMiniLoad] = useState(false)

  const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>
  }

  const champs = state.champData
  const getCharacter = useCallback(async () => {
    try {
      const summoner = await axios
        .get(`http://127.0.0.1:3000/summoner?name=${user}`)
        .then(results => results.data)
      const sumdata = await axios
        .all([
          axios.get(`http://127.0.0.1:3000/rank?id=${summoner.id}`),
          axios.get(`http://127.0.0.1:3000/mastery?id=${summoner.id}`),
          axios.get(
            `http://127.0.0.1:3000/matches?id=${summoner.accountId}&s=0&e=5`
          )
        ])
        .then(resArr => [resArr[0].data, resArr[1].data, resArr[2].data])
      setState(prevState => ({
        ...state,
        SummonerData: {
          playerData: summoner,
          rankData: sumdata[0],
          champData: sumdata[1],
          matchH: sumdata[2]
        }
      }))
      setLoadingS(false)
    } catch (err) {
      console.log(err)
    }
  }, [user])

  useEffect(() => {
    getCharacter()
  }, [getCharacter])

  const moreChampsu = async () => {
    console.log({ s: s, e: e })
    s = s + 5
    e = e + 5
    await axios
      .get(
        `http://127.0.0.1:3000/matches?id=${state.SummonerData.playerData.accountId}&s=${s}&e=${e}`
      )
      .then(val => {
        val.data.map(x => state.SummonerData.matchH.push(x))
        setGamsu(true)
      })
    setGamsu(false)
    console.log({ s: s, e: e })
  }
  let arrParti = []

  const matchH = state.SummonerData.matchH

  const wiwi = matchH.map(ind => {
    const iwi = ind.participantIdentities.map(owo => owo.player.summonerId)
    const uwu = ind.participantIdentities.map(x => x.participantId)
    const num1 = uwu
    const num2 = iwi
    num1.forEach((v, i) => {
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

  const matchHistory = matchH.map((element, i) => {
    const participantStats = element.participants.find(
      x => x.participantId === pId[i].participantId
    )
    const filteredTeam = element.teams.find(
      x => x.teamId === participantStats.teamId
    )
    const newMatch = {
      date: element.gameCreation,
      duration: element.gameDuration,
      mode: element.gameMode,
      type: element.gameType,
      pStat: participantStats,
      team: filteredTeam
    }
    return newMatch
  })

  const matchHistoryChamp = matchHistory.map(element => {
    const obj = champs.find(x => x.key === element.pStat.championId.toString())
    return { name: obj.id, ...element }
  })
  const rank = state.SummonerData.rankData.map(data => {
    if (data.queueType === 'RANKED_FLEX_SR') {
      return {
        tier: data.tier,
        rank: data.rank,
        lp: data.leaguePoints,
        wins: data.wins,
        losses: data.losses,
        qType: 'Flex 5/5',
        wr: (data.wins / (data.wins + data.losses)) * 100
      }
    } else {
      return {
        tier: data.tier,
        rank: data.rank,
        lp: data.leaguePoints,
        wins: data.wins,
        losses: data.losses,
        qType: 'Solo / Duo',
        wr: (data.wins / (data.wins + data.losses)) * 100
      }
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
  const switchRank = () => setRank(sRank == 0 ? 1 : 0)
  const matchesRender = matchHistoryChamp.map((mh, i) => {
    const flipCard = () => {
      let c1 = document.getElementById(`card1${i}`)
      let c2 = document.getElementById(`card2${i}`)
      c1.style.display = c1.style.display != 'none' ? 'none' : 'flex'
      c2.style.display = c2.style.display != 'flex' ? 'flex' : 'none'
      c1.style.animation =
        'fade-in 1.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
      c2.style.animation =
        'fade-in 1.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
    }
    const bgWin = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mh.name}_1.jpg)`
    }
    const dmg =
      Math.abs(mh.pStat.stats.totalDamageDealtToChampions) > 999
        ? Math.sign(mh.pStat.stats.totalDamageDealtToChampions) *
            (
              Math.abs(mh.pStat.stats.totalDamageDealtToChampions) / 1000
            ).toFixed(1) +
          'k'
        : Math.sign(mh.pStat.stats.totalDamageDealtToChampions) *
          Math.abs(mh.pStat.stats.totalDamageDealtToChampions)
    const it1 = `http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${mh.pStat.stats.item0}.png`
    const it2 = `http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${mh.pStat.stats.item1}.png`
    const it3 = `http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${mh.pStat.stats.item2}.png`
    const it4 = `http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${mh.pStat.stats.item3}.png`
    const it5 = `http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${mh.pStat.stats.item4}.png`
    const it6 = `http://ddragon.leagueoflegends.com/cdn/10.2.1/img/item/${mh.pStat.stats.item5}.png`
    return (
      <Col key={i}>
        <MyCard style={bgWin} onClick={() => flipCard()}>
          <CardKarada id={`card1${i}`}>
            <MyCardImg
              style={
                mh.pStat.stats.win
                  ? { border: '3px solid #4feac0' }
                  : { border: '3px solid red' }
              }
              src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/champion/${mh.name}.png`}
            />
            <MyCardH1
              style={
                mh.pStat.stats.win ? { color: '#1a78ae' } : { color: '#c6443e' }
              }
            >
              {mh.pStat.stats.win ? 'Victory' : 'Defeat'}
            </MyCardH1>
            <MyCardLast>
              <MyCardLastOne>
                <h4>
                  <img
                    style={{ verticalAlign: 'middle' }}
                    src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
                  />
                  {mh.pStat.stats.totalMinionsKilled +
                    mh.pStat.stats.neutralMinionsKilled}{' '}
                  Cs
                </h4>
                <h4>
                  <img
                    style={{ verticalAlign: 'top' }}
                    src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png"
                  />
                  {`${mh.pStat.stats.kills} / `}
                  <span style={{ color: 'red' }}>{mh.pStat.stats.deaths}</span>
                  {` / ${mh.pStat.stats.assists}`}
                </h4>
              </MyCardLastOne>
              <MyCardLastTwo>
                <h4>{moment(mh.date + mh.duration * 1000).fromNow()}</h4>
                <h4>{moment.utc(mh.duration * 1000).format('m:ss')} mins</h4>
              </MyCardLastTwo>
            </MyCardLast>
          </CardKarada>
          <CardKarada style={{ display: 'none' }} id={`card2${i}`}>
            <MyCardTitle>
              <h3
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'Roboto',
                  letterSpacing: '2px',
                  textAlign: 'center'
                }}
              >
                {mh.name}
              </h3>
              <h5>
                <b>Champion Level: </b>
                {mh.pStat.stats.champLevel}
              </h5>
            </MyCardTitle>
            <MyCardBody>
              <h5>
                <b>Total Damage: </b>
                {dmg}
              </h5>
              <h5>
                <b>Vision Score: </b>
                {mh.pStat.stats.visionScore}
              </h5>
              <Row>
                <Col sm="12" md="12" lg="12">
                  <ItemImg src={it1} />
                  <ItemImg src={it2} />
                  <ItemImg src={it3} />
                </Col>
              </Row>
              <Row>
                <Col sm="12" md="12" lg="12">
                  <ItemImg src={it4} />
                  <ItemImg src={it5} />
                  <ItemImg src={it6} />
                </Col>
              </Row>
            </MyCardBody>
          </CardKarada>
        </MyCard>
      </Col>
    )
  })

  const mainChampsRender = slicedChamps.map(element => {
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

  return loadingS ? (
    <Loading />
  ) : (
    <PDiv>
      <Containerr fluid>
        <Row style={{ marginBottom: '7vh' }}>
          <Col sm="12" md="3" lg="3">
            <Row>
              <Col sm="12" md="5" lg="5">
                <Pfp
                  id="img"
                  sm="12"
                  md="4"
                  lg="4"
                  src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/${state.SummonerData.playerData.profileIconId}.png`}
                />
              </Col>
              <Col>
                <Row>
                  <H1>{state.SummonerData.playerData.name}</H1>
                </Row>
                <Row>
                  <Lvl>Lvl {state.SummonerData.playerData.summonerLevel}</Lvl>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col sm="12" md="5" lg="5">
            <Row>
              <MyH1>{rank[sRank] ? rank[sRank].qType : 'Unranked'}</MyH1>
            </Row>
            <Row>
              <MyCol sm="3" md="4" lg="4">
                <H4 style={{ textAlign: 'right' }}>
                  {rank[sRank]
                    ? rank[sRank].tier +
                      ' ' +
                      rank[sRank].rank +
                      ' ' +
                      rank[sRank].lp +
                      'LP'
                    : ''}
                </H4>
              </MyCol>
              <MyCol1 sm="6" md="4" lg="4">
                <Rp
                  src={
                    rank[sRank]
                      ? require(`../../assets/rankedLogos/${rank[sRank].tier}.png`)
                      : require(`../../assets/rankedLogos/UNRANKED.png`)
                  }
                />
              </MyCol1>
              <MyCol2 sm="3" md="4" lg="4">
                <Row>
                  <Col sm="12" md="12" lg="12">
                    <H4>
                      {rank[sRank]
                        ? rank[sRank].wins +
                          ' Wins | ' +
                          rank[sRank].losses +
                          ' Losses'
                        : ''}
                    </H4>
                  </Col>
                  <Col sm="12" md="12" lg="12">
                    <H5>
                      {rank[sRank]
                        ? `WinRate ${Math.round(rank[sRank].wr)}%`
                        : ''}
                    </H5>
                  </Col>
                </Row>
              </MyCol2>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
              <Sbutton onClick={() => switchRank()}>Rank Switch</Sbutton>
            </Row>
          </Col>
          <Col sm="12" md="4" lg="4">
            <Cstat>
              <ReactCardCarousel disable_keydown={false}>
                {mainChampsRender}
                <Cardu
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(' +
                      more +
                      ')'
                  }}
                >
                  <CardBody>
                    <a onClick={() => addMore()}>Load More</a>
                  </CardBody>
                </Cardu>
              </ReactCardCarousel>
            </Cstat>
          </Col>
        </Row>
        <Row
          style={{
            borderRadius: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            marginBottom: '12vh'
          }}
        >
          {matchesRender}
          <button onClick={() => moreChampsu()}>ADD MORE</button>
        </Row>
      </Containerr>
    </PDiv>
  )
}

const ItemImg = styled.img`
  width: 17%;
`

const Sbutton = styled.button`
  align-self: center;
  cursor: pointer;
  background: transparent;
  padding: 1rem 1rem;
  margin: 0 1rem;
  margin-top: 1rem;
  transition: all 0.5s ease;
  color: #fff;
  font-size: 1.5rem;
  letter-spacing: 1px;
  outline: none;
  box-shadow: 20px 38px 34px -26px rgba(255, 255, 255, 0.2);
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
  border: solid 2px #fff;
  transition: 0.4s ease-out;

  :focus {
    outline: 0;
  }
  :active {
    box-shadow: none;
    background-color: rgba(255, 255, 255, 0.2);
  }
`

const MyCol = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const MyCol1 = styled(MyCol)`
  justify-content: center;
`
const MyCol2 = styled(MyCol)`
  justify-content: center;
  flex-direction: column;
`

const PDiv = styled.body`
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
    url('https://d3gz42uwgl1r1y.cloudfront.net/fi/fireflufferz/submission/2016/05/015f94d8c6b0bbe38b110b54c88094ef/2500x1500.jpg');
  background-repeat: repeat;
  /* background-position: center; */
  background-size: 100%;
`
const Containerr = styled(Container)`
  transition: 1s ease;
  margin-top: 15vh;
  padding-right: 90px;
  padding-left: 90px;
  @media only screen and (max-width: 600px) {
    padding: 0;
  }
`

const MyCard = styled.div`
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 300px;
  height: 350px;
  border: none;
  color: white;
  border-radius: 10%;
  margin-top: 5vh;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5vh;
  transition: 0.4s ease-out;
  cursor: pointer;
  :hover {
    transform: translateY(-20px);
  }
`
const CardKarada = styled.div`
  flex-wrap: nowrap;
  flex-direction: column;
  display: flex;
`

const MyCardImg = styled.img`
  width: 40%;
  border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
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
  margin-top: 1rem;
  h4 {
    text-align: left;
    font-size: 17px;
    margin-left: 1rem;
  }
`

const MyCardLastTwo = styled.div`
  width: 50%;
  margin-top: 1rem;

  h4 {
    text-align: right;
    font-size: 17px;
    margin-right: 0.5rem;
  }
`

const MyCard2 = styled(MyCard)`
  transform: translateY(-20px);
  display: none;
  :hover {
  }
`
const MyCardBody = styled.div``

const MyCardTitle = styled.div``

const Cstat = styled.div`
  display: flex;
  flex: 1;
  width: 500px;
  flex-wrap: wrap;
  height: 400px;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
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
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
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

const H1 = styled.h1`
  text-align: left;
  color: white;
  letter-spacing: 2px;
`
const MyH1 = styled.h1`
  text-transform: uppercase;
  text-align: center;
  width: 100%;
  color: white;
  font-family: 'Roboto Condensed', sans-serif;
`
const Lvl = styled.h4`
  text-align: left;
  color: white;
  letter-spacing: 2px;
`

const Pfp = styled.img`
  width: 100%;
  max-width: 170px;
  height: auto;
`

const Rp = styled.img`
  width: 100%;
  max-width: 190px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`

const H4 = styled.h4`
  color: white;
  text-align: left;
  font-size: 1.25rem;
`

const H5 = styled.h5`
  text-align: left;
  color: white;

  @media only screen and (max-width: 600px) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
    text-align: center;
  }
`

import React, { useEffect, useContext, useCallback, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { MrLegendContext } from 'providers/AppProvider'
import styled from 'styled-components'
import Loading from '../loading/Loading'
import { LoopCircleLoading } from 'react-loadingg'
import { ButtonL, ButtonC } from 'components/common/Buttons/Button'
import FadeIn from 'react-fade-in'
import Slider from 'react-slick'
import '../common/Card/card.css'
import {
  Cheader,
  Cardu,
  MyCard,
  CardKarada,
  MyCardImg,
  MyCardH1,
  MyCardLast,
  MyCardLastOne,
  MyCardLastTwo
} from 'components/common/Card/Card'
import { Containerr } from 'components/common/Containers/ProfileContainers'
import { Row, Col, CardTitle, CardBody, CardFooter } from 'shards-react'

var s = 0
var e = 4

export default () => {
  const [loadingS, setLoadingS] = useState(true)
  const [moreC, setMore] = useState(6)
  const { state, user, setState } = useContext(MrLegendContext)
  const [sRank, setRank] = useState(0)
  const [gamesu, setGamsu] = useState(false)
  const [miniLoad, setMiniLoad] = useState(false)

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  const champs = state.champData
  const getCharacter = useCallback(async () => {
    try {
      const summoner = await axios
        .get(`https://mr-legend.herokuapp.com/summoner?name=${user}`)
        .then(results => results.data)
      const sumdata = await axios
        .all([
          axios.get(`https://mr-legend.herokuapp.com/rank?id=${summoner.id}`),
          axios.get(
            `https://mr-legend.herokuapp.com/mastery?id=${summoner.id}`
          ),
          axios.get(
            `https://mr-legend.herokuapp.com/matches?id=${summoner.accountId}&s=0&e=4`
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

  const moreChampsu = async event => {
    event.preventDefault()

    setMiniLoad(true)
    s = s + 4
    e = e + 4
    await axios
      .get(
        `https://mr-legend.herokuapp.com/matches?id=${state.SummonerData.playerData.accountId}&s=${s}&e=${e}`
      )
      .then(val => {
        val.data.map(x => state.SummonerData.matchH.push(x))
        setGamsu(true)
      })
    setGamsu(false)
    setMiniLoad(false)
  }
  let arrParti = []

  const matchH = state.SummonerData.matchH

  matchH.map(ind => {
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
        <FadeIn>
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
                  mh.pStat.stats.win
                    ? { color: '#1a78ae' }
                    : { color: '#c6443e' }
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
                    <span style={{ color: 'red' }}>
                      {mh.pStat.stats.deaths}
                    </span>
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
              <div>
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
              </div>
              <div>
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
              </div>
            </CardKarada>
          </MyCard>
        </FadeIn>
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
      <Cardu key={newobj.key}>
        <img src={imgs} alt="" srcset="" />
        <Cheader className="Cheader">{newobj.id}</Cheader>
        <CardBody className="Cbody">
          <CardTitle className="Ctitle">{newobj.title}</CardTitle>
          <h2> Mastery {newobj.lvl}</h2>
          <CardFooter className="cbot">
            <span>{succ}</span> Mastery Points
          </CardFooter>
        </CardBody>
      </Cardu>
    )
  })

  return loadingS ? (
    <Loading />
  ) : (
    <FadeIn>
      <Bggg
        src="https://images3.alphacoders.com/102/1029326.jpg"
        alt="bg"
        class="bg"
      ></Bggg>
      <Containerr fluid>
        <Row style={{ marginBottom: '7vh' }}>
          <Col sm="12" md="12" lg="12">
            <Slider {...settings}>
              <div class="wrapper">
                <div class="profile-card js-profile-card">
                  <div class="profile-card__img">
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/${state.SummonerData.playerData.profileIconId}.png`}
                      alt="profile card"
                    />
                  </div>

                  <div class="profile-card__cnt js-profile-cnt">
                    <div class="profile-card__name">
                      {state.SummonerData.playerData.name}
                    </div>
                    <div class="profile-card__txt">
                      Lvl {state.SummonerData.playerData.summonerLevel}
                    </div>
                    <div class="profile-card-loc">
                      {rank[sRank] ? rank[sRank].qType : 'Unranked'}
                    </div>

                    <div class="profile-card-inf">
                      <div class="profile-card-inf__item1">
                        <div class="profile-card-inf__title">
                          {rank[sRank]
                            ? rank[sRank].tier + ' ' + rank[sRank].rank
                            : ''}
                        </div>
                        <div class="profile-card-inf__txt">
                          {rank[sRank] ? rank[sRank].lp + ' LP' : ''}
                        </div>
                      </div>

                      <div
                        class="profile-card-inf__item"
                        style={{ width: '50%  ' }}
                      >
                        <div class="profile-card-inf__title">
                          <img
                            src={
                              rank[sRank]
                                ? require(`../../assets/rankedLogos/${rank[sRank].tier}.png`)
                                : require(`../../assets/rankedLogos/UNRANKED.png`)
                            }
                            alt=""
                          />
                        </div>
                      </div>

                      <div class="profile-card-inf__item2">
                        <div class="profile-card-inf__title">
                          {rank[sRank]
                            ? rank[sRank].wins +
                              'W | ' +
                              rank[sRank].losses +
                              'L'
                            : ''}
                        </div>
                        <div class="profile-card-inf__txt">
                          {rank[sRank]
                            ? `${Math.round(rank[sRank].wr)}% WR`
                            : ''}
                        </div>
                      </div>
                    </div>

                    {/* <div class="profile-card-social">///</div> */}

                    <div class="profile-card-ctr">
                      {/* <button class="profile-card__button button--blue js-message-btn">
                        Message
                      </button> */}
                      <button
                        onClick={() => switchRank()}
                        class="profile-card__button button--blue"
                      >
                        Switch Rank
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div class="wrapper1">
                <div class="profile-card1">
                  <Slider {...settings}>
                    {mainChampsRender}
                    <ButtonC onClick={() => addMore()}>Load More</ButtonC>
                  </Slider>
                </div>
              </div>
            </Slider>
          </Col>
        </Row>
        {/* <Row>
          <Col sm="12" md="12" lg="12">
            <ButtonL onClick={e => moreChampsu(e)}>
              <span class="top">Load More</span>
              <span class="bottom">˅</span>
            </ButtonL>
          </Col>
        </Row> */}
        <Row
          style={{
            borderRadius: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {matchesRender}
        </Row>
        <Row
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            marginBottom: '10vh'
          }}
        >
          {miniLoad ? (
            <LoopCircleLoading
              style={{ position: 'relative', marginTop: '20px' }}
              color="white"
            />
          ) : (
            <ButtonL onClick={e => moreChampsu(e)}>
              <span class="top">Load More</span>
              <span class="bottom">˅</span>
            </ButtonL>
          )}
        </Row>
      </Containerr>
    </FadeIn>
  )
}

const Cimg = styled.img`
  height: 330px;
  width: 300px;
`

const Bggg = styled.img`
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`
const ItemImg = styled.img`
  width: 17%;
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

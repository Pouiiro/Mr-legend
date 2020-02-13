import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useRef
} from 'react'
import { MrLegendContext } from 'providers/AppProvider'
import styled from 'styled-components'
import Slider from 'react-slick'
import FadeIn from 'react-fade-in'
import '../common/Card/card.css'
import { LoopCircleLoading, SemipolarLoading } from 'react-loadingg'
import axios from 'axios'
import moment from 'moment'
import Loading from '../loading/Loading'
import { ButtonL } from 'components/common/Buttons/Button'
import {
  MyCard,
  CardKarada,
  MyCardImg,
  MyCardH1,
  MyCardLast,
  MyCardLastOne,
  MyCardLastTwo
} from 'components/common/Card/Card'
import { Containerr } from 'components/common/Containers/ProfileContainers'
import { Row, Col } from 'shards-react'
import pBg from 'assets/images/pBg.jpg'
import none from 'assets/images/none.png'
var s = 0
var e = 5
const oApi = 'API'

moment.updateLocale('en', {
  relativeTime: {
    s: 'A few seconds',
    ss: '%d seconds',
    m: 'A min',
    mm: '%d mins',
    h: 'An hour',
    hh: '%d hrs',
    d: 'A day',
    dd: '%d days',
    M: 'A month',
    MM: '%d months',
    y: 'A year',
    yy: '%d years'
  }
})

export default () => {
  const { state, user, setState } = useContext(MrLegendContext)
  const [loadingS, setLoadingS] = useState(true)
  const [moreC, setMore] = useState(6)
  const [sRank, setRank] = useState(0)
  const [gamesu, setGamsu] = useState(false)
  const [miniLoad, setMiniLoad] = useState(false)
  const [miniLoad2, setMiniLoad2] = useState(false)
  const inputEl = useRef()

  const errorSrc = e => {
    e.target.src = none
  }

  const next = () => {
    inputEl.current.slickNext()
  }
  const previous = () => {
    inputEl.current.slickPrev()
  }

  var settings1 = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    fade: true,
    draggable: false,
    swipe: false
  }

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  const champs = state.champData
  const getCharacter = useCallback(async () => {
    try {
      const summoner = await axios
        .get(`${oApi}summoner?name=${user}`)
        .then(results => results.data)
      const sumdata = await axios
        .all([
          axios.get(`${oApi}rank?id=${summoner.id}`),
          axios.get(`${oApi}mastery?id=${summoner.id}`),
          axios.get(`${oApi}matches?id=${summoner.accountId}&s=0&e=5`),
          axios.get(
            'http://static.developer.riotgames.com/docs/lol/queues.json'
          )
        ])
        .then(resArr => [
          resArr[0].data,
          resArr[1].data,
          resArr[2].data,
          resArr[3].data
        ])
      setState({
        ...state,
        SummonerData: {
          playerData: summoner,
          rankData: sumdata[0],
          champData: sumdata[1],
          matchH: sumdata[2]
        },
        QueueData: sumdata[3]
      })
      setLoadingS(false)
    } catch (err) {
      console.log(err)
    }
  }, [])

  useEffect(() => {
    getCharacter()
  }, [getCharacter])

  const moreChampsu = async event => {
    event.preventDefault()
    setMiniLoad(!miniLoad)
    s = s + 5
    e = e + 5
    await axios
      .get(
        `${oApi}matches?id=${state.SummonerData.playerData.accountId}&s=${s}&e=${e}`
      )
      .then(val => {
        val.data.map(x => state.SummonerData.matchH.push(x))
        setGamsu(!gamesu)
      })
    setGamsu(gamesu)
    setMiniLoad(miniLoad)
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
    return null
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
      queueId: element.queueId,
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

  const addMore = () => {
    setMiniLoad2(!miniLoad2)
    setMore(moreC + 4)
    setTimeout(() => {
      setMiniLoad2(miniLoad2)
    }, 500)
  }

  const switchRank = () => setRank(sRank === 0 ? 1 : 0)

  const matchesRender = matchHistoryChamp.map((mh, i) => {
    const flipCard = () => {
      let c1 = document.getElementById(`card1${i}`)
      let c2 = document.getElementById(`card2${i}`)
      c1.style.display = c1.style.display !== 'none' ? 'none' : 'flex'
      c2.style.display = c2.style.display !== 'flex' ? 'flex' : 'none'
      c1.style.animation =
        'fade-in 1.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
      c2.style.animation =
        'fade-in 1.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
    }
    const bgWin = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${mh.name}_1.jpg)`
    }
    const gameInfo = state.QueueData.find(x => x.queueId == mh.queueId)
    const simplifiedGameInfo = gameInfo.description.replace(
      /6v6|5v5|games|/gi,
      ''
    )
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
                alt=""
              />
              <MyCardH1
                style={
                  mh.pStat.stats.win ? { color: '#4feac0' } : { color: 'red' }
                }
              >
                {mh.pStat.stats.win ? 'Victory' : 'Defeat'}
              </MyCardH1>
              <h6>{simplifiedGameInfo}</h6>
              <MyCardLast>
                <MyCardLastOne>
                  <h4>
                    <img
                      style={{ verticalAlign: 'middle' }}
                      src="http://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/minion.png"
                      alt=""
                    />
                    {mh.pStat.stats.totalMinionsKilled +
                      mh.pStat.stats.neutralMinionsKilled}{' '}
                    Cs
                  </h4>
                  <h4>
                    <img
                      style={{ verticalAlign: 'top' }}
                      src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/score.png"
                      alt=""
                    />
                    {`${mh.pStat.stats.kills} / `}
                    <span style={{ color: 'red' }}>
                      {mh.pStat.stats.deaths}
                    </span>
                    {` / ${mh.pStat.stats.assists}`}
                  </h4>
                </MyCardLastOne>
                <MyCardLastTwo>
                  <h4>
                    <img
                      style={{ verticalAlign: 'top' }}
                      src="https://ddragon.leagueoflegends.com/cdn/5.5.1/img/ui/spells.png"
                      alt=""
                    />
                    {moment(mh.date + mh.duration * 1000).fromNow()}
                  </h4>
                  <h4>
                    <img
                      style={{ verticalAlign: 'middle' }}
                      src="http://raw.communitydragon.org/10.3/game/data/images/ui/floatingcombattext/goldicon.png"
                      alt=""
                    />
                    {'  '}
                    {moment.utc(mh.duration * 1000).format('m:ss')} mins
                  </h4>
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
                    <ItemImg src={it1} onError={e => errorSrc(e)} />
                    <ItemImg src={it2} onError={e => errorSrc(e)} />
                    <ItemImg src={it3} onError={e => errorSrc(e)} />
                  </Col>
                </Row>
                <Row>
                  <Col sm="12" md="12" lg="12">
                    <ItemImg src={it4} onError={e => errorSrc(e)} />
                    <ItemImg src={it5} onError={e => errorSrc(e)} />
                    <ItemImg src={it6} onError={e => errorSrc(e)} />
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
    // const imgs = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${newobj.id}_2.jpg`
    const imgp = `https://ddragon.leagueoflegends.com/cdn/10.3.1/img/champion/${newobj.id}.png`
    const succ =
      Math.abs(socc) > 999
        ? Math.sign(socc) * (Math.abs(socc) / 1000).toFixed(1) + 'k'
        : Math.sign(socc) * Math.abs(socc)
    return (
      <div key={newobj.key} className="wrapper">
        <div className="profile-card js-profile-card">
          <div className="profile-card__img">
            <img src={imgp} alt="profile card" />
          </div>
          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">{newobj.id}</div>
            <div className="profile-card-loc">{newobj.title}</div>
            <div className="profile-card-inf">
              <div className="profile-card-inf__item1">
                <div className="profile-card-inf__title">Mastery</div>
                <div className="profile-card-inf__txt">{newobj.lvl}</div>
              </div>
              <div
                className="profile-card-inf__item"
                style={{ width: '50%  ' }}
              >
                <div className="profile-card-inf__title">
                  <img
                    src={require(`../../assets/mastery/${newobj.lvl}.png`)}
                    alt=""
                  />
                </div>
              </div>
              <div className="profile-card-inf__item2">
                <div className="profile-card-inf__title">MPoints</div>
                <div className="profile-card-inf__txt">{succ}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  })

  return loadingS ? (
    <Loading />
  ) : (
    <FadeIn>
      <PBackground src={pBg} alt="" className="bg"></PBackground>
      <Containerr fluid>
        <MyRow>
          <MyCol1 sm="12" md="12" lg="12">
            <Slider {...settings}>
              <div className="wrapper">
                <div className="profile-card js-profile-card">
                  <div className="profile-card__img">
                    <img
                      src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/${state.SummonerData.playerData.profileIconId}.png`}
                      alt="profile"
                    />
                  </div>
                  <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__name">
                      {state.SummonerData.playerData.name}
                    </div>
                    <div className="profile-card__txt">
                      Lvl {state.SummonerData.playerData.summonerLevel}
                    </div>
                    <div className="profile-card-loc">
                      {rank[sRank] ? rank[sRank].qType : 'Unranked'}
                    </div>
                    <div className="profile-card-inf">
                      <div className="profile-card-inf__item1">
                        <div className="profile-card-inf__title">
                          {rank[sRank]
                            ? rank[sRank].tier + ' ' + rank[sRank].rank
                            : ''}
                        </div>
                        <div className="profile-card-inf__txt">
                          {rank[sRank] ? rank[sRank].lp + ' LP' : ''}
                        </div>
                      </div>
                      <div
                        className="profile-card-inf__item"
                        style={{ width: '50%  ' }}
                      >
                        <div className="profile-card-inf__title">
                          <img
                            src={
                              rank[sRank]
                                ? require(`../../assets/rankedLogos/${rank[sRank].tier}.png`)
                                : require(`../../assets/rankedLogos/UNRANKED.png`)
                            }
                            alt="rank"
                          />
                        </div>
                      </div>
                      <div className="profile-card-inf__item2">
                        <div className="profile-card-inf__title">
                          {rank[sRank]
                            ? rank[sRank].wins +
                              'W | ' +
                              rank[sRank].losses +
                              'L'
                            : ''}
                        </div>
                        <div className="profile-card-inf__txt">
                          {rank[sRank]
                            ? `${Math.round(rank[sRank].wr)}% WR`
                            : ''}
                        </div>
                      </div>
                    </div>
                    <div className="profile-card-ctr">
                      <button
                        onClick={() => switchRank()}
                        className="profile-card__button button--blue"
                      >
                        Switch Rank
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <MyRow>
                <Col
                  sm="12"
                  md="12"
                  lg="12"
                  style={{
                    marginLeft: '0',
                    marginRight: '0',
                    paddingLeft: '0',
                    paddingRight: '0'
                  }}
                >
                  <Slider ref={inputEl} {...settings1}>
                    {mainChampsRender}
                  </Slider>
                </Col>
                <Row>
                  <MyCol sm="12" md="4" lg="4">
                    <button
                      onClick={() => previous()}
                      className="profile-card__button button--blue sec"
                    >
                      Previous
                    </button>
                  </MyCol>
                  <MyCol sm="12" md="4" lg="4">
                    {miniLoad2 ? (
                      <SemipolarLoading
                        style={{ position: 'relative', marginTop: '20px' }}
                        color="white"
                      />
                    ) : (
                      <button
                        onClick={() => addMore()}
                        className="profile-card__button button--gray sec"
                      >
                        Load More
                      </button>
                    )}
                  </MyCol>
                  <MyCol sm="12" md="4" lg="4">
                    <button
                      onClick={() => next()}
                      className="profile-card__button button--blue sec"
                    >
                      Next
                    </button>
                  </MyCol>
                </Row>
              </MyRow>
            </Slider>
          </MyCol1>
        </MyRow>
        <Row>
          <div className="wrapper1">
            <div className="profile-card1">{matchesRender}</div>
          </div>
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
              <span className="top">Load More</span>
              <span className="bottom">˅</span>
            </ButtonL>
          )}
        </Row>
      </Containerr>
    </FadeIn>
  )
}

const PBackground = styled.img`
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  @media screen and (max-width: 1024px) {
    left: 50%;
    margin-left: -512px;
  }
`
const ItemImg = styled.img`
  width: 17%;
  border: 2px black solid;
`
const MyCol = styled(Col)`
  margin-right: 0;
  margin-left: 0;
  padding-right: 0px;
  padding-left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const MyCol1 = styled(Col)`
  @media screen and (max-width: 600px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`
const MyRow = styled(Row)`
  margin-right: 0;
  margin-left: 0;
`

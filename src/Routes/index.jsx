import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from 'components/home'
import Profile from 'components/profile'
import Navbar from 'components/common/Navbar/Navbar'
import ScrollToTop from 'react-router-scroll-top'

export default () => (
  <BrowserRouter>
    <ScrollToTop>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
      </Switch>
    </ScrollToTop>
  </BrowserRouter>
)

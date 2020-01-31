import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from 'components/home'
import Profile from 'components/profile'
import Navbar from 'components/common/navbar/Navbar'

export default () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
    </Switch>
  </BrowserRouter>
)

import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import ResourceCollector from './forms/ResourceCollector'
import UpdateResource from './forms/UpdateResource'


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/resource'>
          <ResourceCollector />
        </Route>
        <Route exact path='/update'>
          <UpdateResource />
        </Route>
      </Switch>
    </Router>
  )
}

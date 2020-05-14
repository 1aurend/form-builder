import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './Home'
import ResourceForm from './forms/ResourceForm'


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/resource'>
          <ResourceForm />
        </Route>
      </Switch>
    </Router>
  )
}

import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Home page</h1>
      </div>
    )
  }
}

class Test extends React.Component {
  render () {
    return (
      <h1>test</h1>
    )
  }
}

class NoMatch extends React.Component {
  render () {
    return (
      <h1>404</h1>
    )
  }
}

render((
  <Router history={browserHistory}>
    <Route path='/' component={App}>
      <Route path='/test' component={Test} />
      <Route path='*' component={NoMatch} />
    </Route>
  </Router>
  ), document.getElementById('app'))

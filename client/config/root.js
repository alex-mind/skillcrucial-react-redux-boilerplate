/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect, StaticRouter } from 'react-router-dom'

import store, { history } from '../redux'

import Home from '../components/home'
import DummyView from '../components/dummy-view'
import NotFound from '../components/404'

import Startup from './startup'

import App from '../components/gitFindApp/app'
import ToDoApp from '../components/toDoApp/toDoApp'
import ShopApp from '../components/shopApp/shopApp'
import GameApp from '../components/gameApp/gameApp'
import SlackClone from '../components/slackCloneApp/slackClone'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const func = (props) =>
    !!rest.user && !!rest.user.name && !!rest.token ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <Component {...props} />
    )
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const func = (props) =>
    !!rest.user && !!rest.user.name && !!rest.token ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    )
  return <Route {...rest} render={func} />
}

const types = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string
  }),
  token: PropTypes.string
}

const defaults = {
  location: {
    pathname: ''
  },
  user: null,
  token: ''
}

OnlyAnonymousRoute.propTypes = types
PrivateRoute.propTypes = types

PrivateRoute.defaultProps = defaults
OnlyAnonymousRoute.defaultProps = defaults

const RouterSelector = (props) =>
  typeof window !== 'undefined' ? <ConnectedRouter {...props} /> : <StaticRouter {...props} />

const RootComponent = (props) => {
  return (
    <Provider store={store}>
      <RouterSelector history={history} location={props.location} context={props.context}>
        <Startup>
          <Switch>
            <Route exact path="/" component={() => <DummyView />} />
            <Route exact path="/dashboard" component={() => <Home />} />
            <Route exact path="/find" component={() => <App />} />
            <Route exact path="/find/*" component={() => <App />} />
            <Route exact path="/todo" component={() => <ToDoApp />} />
            <Route exact path="/todo/*" component={() => <ToDoApp />} />
            <Route exact path="/shop" component={() => <ShopApp />} />
            <Route exact path="/shop/*" component={() => <ShopApp />} />
            <Route exact path="/game" component={() => <GameApp />} />
            <Route exact path="/game/*" component={() => <GameApp />} />
            <Route exact path="/slack" component={() => <SlackClone />} />
            <Route exact path="/slack/*" component={() => <SlackClone />} />
            <PrivateRoute exact path="/hidden-route" component={() => <DummyView />} />
            <Route component={() => <NotFound />} />
          </Switch>
        </Startup>
      </RouterSelector>
    </Provider>
  )
}

export default RootComponent

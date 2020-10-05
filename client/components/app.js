import React from 'react'
import { Route } from 'react-router-dom'
import { history } from '../redux'
import { RepoInput, RepoList, RepoReadMe } from './findRepo'

const App = () => {
  const onChange = (user) => {
    history.push(`/find/${user}`)
  }

  return (
    <div>
      <Route exact path="/find" component={() => <RepoInput onChange={onChange} />} />
      <Route exact path="/find/:username" component={() => <RepoList />} />
      <Route exact path="/find/:username/:repository" component={() => <RepoReadMe />} />
    </div>
  )
}

App.propTypes = {}

export default App

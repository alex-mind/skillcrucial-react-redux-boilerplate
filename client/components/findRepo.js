import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

import axios from 'axios'

const RepoInput = (props) => {
  const [value, setValue] = useState('')

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const sendUser = () => {
    props.onChange(value)
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <input
        className="shadow-md border rounded text-4xl mx-4 px-2"
        type="text"
        id="input-field"
        value={value}
        onChange={onChange}
      />
      <button
        className="text-4xl px-2 rounded border-solid border-blue-500 border-2 bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white"
        id="search-button"
        type="button"
        onClick={sendUser}
      >
        Search
      </button>
    </div>
  )
}

const Header = (props) => {
  const { username } = useParams()
  return (
    <div className="flex justify-center items-center flex-col">
      <div id="repository-name" className="text-lg">
        {username}
      </div>
      <div>
        <Link
          id="go-back"
          to="/find"
          className="mx-2 px-2 rounded border-solid border-blue-500 border-2 bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white"
        >
          Go to Search
        </Link>
        {props.readMeBool && (
          <Link
            id="go-repository-list"
            to={`/find/${username}/`}
            className="px-2 rounded border-solid border-blue-500 border-2 bg-transparent hover:bg-blue-500 text-blue-500 hover:text-white"
          >
            {' '}
            Back to repositories
          </Link>
        )}
      </div>
    </div>
  )
}

const List = (props) => {
  const { username } = useParams()
  const repo = props
  const created_date = new Date(props.created_at)
  return (
    <div>
      <Link to={`/find/${username}/${repo.name}`} key={repo.id} className="flex">
        <div className="w-2/5">{repo.name}</div>
        <div className="w-1/5 text-center">{repo.forks_count}</div>
        <div className="w-1/5 text-center">{repo.language}</div>
        <div className="w-1/5 text-center">{`${created_date.getDate()}/${
          created_date.getMonth() + 1
        }/${created_date.getFullYear()}`}</div>
      </Link>
    </div>
  )
}

const RepoList = () => {
  const { username } = useParams()
  const [repos, setRepos] = useState([])

  useEffect(() => {
    axios(`https://api.github.com/users/${username}/repos`)
      .then((res) => setRepos(res.data))
      .catch(() => setRepos([{ name: 'Repositories Not Found' }]))
  }, [username])

  return (
    <div className="flex justify-center items-center flex-col w-screen">
      <Header />
      <div className="flex flex-col w-1/2">
        <div className="flex border-b-2 border-blue-500 border-solid">
          <div className="w-2/5">Repository name</div>
          <div className="w-1/5 text-center">Forks count</div>
          <div className="w-1/5 text-center">Language</div>
          <div className="w-1/5 text-center">Date created</div>
        </div>
        {repos.map((repo) => (
          <List key={repo.id} {...repo} />
        ))}
      </div>
    </div>
  )
}

const RepoReadMe = () => {
  const readMeBool = true

  const { username, repository } = useParams()

  const [readMe, setReadMe] = useState('')

  useEffect(() => {
    axios(`https://raw.githubusercontent.com/${username}/${repository}/master/README.md`)
      .then((ReadMeText) => setReadMe(ReadMeText.data))
      .catch(() => setReadMe('No ReadMe file'))
  }, [username, repository])

  return (
    <div className="flex flex-col justify-center items-center">
      <Header readMeBool={readMeBool} />
      <div
        id="description"
        className="w-3/4 overflow-scroll rounded border-l-2 border-r-2 border-b-2 border-solid border-blue-500"
      >
        <ReactMarkdown source={readMe} />
      </div>
    </div>
  )
}

RepoReadMe.proTypes = {}
RepoList.propsType = {}
RepoInput.propsTypes = {}

export { RepoInput, RepoList, RepoReadMe }

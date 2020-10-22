import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import classnames from 'classnames'

const Filter = (props) => {
    const { category } = useParams()
    const [underlined, setUnderlined] = useState('show all')
    const buttonstyle = 'mx-4 hover:text-blue-500'

    const onClick = async (e) => {
        const timestamp = e.target.value
        if (!timestamp) {
            await axios
              .get(`/api/v1/tasks/${category}`)
              .then(() => props.setUpdateTasks(props.updateTasks + 1))
              .then(() => setUnderlined('show all'))
        } else {
            await axios
              .get(`/api/v1/tasks/${category}/${timestamp}`)
              .then(() => props.setUpdateTasks(props.updateTasks + 1))
              .then(() => setUnderlined(timestamp))
        }
    }

    return (
      <div className="flex flex-wrap justify-center">
        Filter by:
        <button
          type="submit"
          className={classnames(buttonstyle, { 'text-blue-700 underline': underlined === 'day' })}
          onClick={onClick}
          value="day"
        >
          day
        </button>
        <button
          type="submit"
          className={classnames(buttonstyle, { 'text-blue-700 underline': underlined === 'week' })}
          onClick={onClick}
          value="week"
        >
          week
        </button>
        <button
          type="submit"
          className={classnames(buttonstyle, { 'text-blue-700 underline': underlined === 'month' })}
          onClick={onClick}
          value="month"
        >
          month
        </button>
        <button
          type="submit"
          className={classnames(buttonstyle, {
            'text-blue-700 underline': underlined === 'show all'
          })}
          onClick={onClick}
          value="show all"
        >
          show all
        </button>
      </div>
    )
}

Filter.propTypes = {}

export default Filter
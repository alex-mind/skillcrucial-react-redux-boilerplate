import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Filter = (props) => {
    const { category } = useParams()

    const onClick = async (e) => {
        const timestamp = e.target.value
        if (!timestamp) {
            await axios.get(`/api/v1/tasks/${category}`)
              .then((tasks) => tasks.data)
              /* eslint-disable no-underscore-dangle */
              .then((tasks) => tasks.filter((item) => !item._isDeleted))
              .then((tasks) => props.setTasks(tasks))
        } else {
            await axios.get(`/api/v1/tasks/${category}/${timestamp}`)
              .then((tasks) => tasks.data)
              /* eslint-disable no-underscore-dangle */
              .then((tasks) => tasks.filter((item) => !item._isDeleted))
              .then((tasks) => props.setTasks(tasks))
        }
    }

    return (
        <div className="flex flex-wrap justify-center">
            Filter by: 
            <button type="submit" className="mx-4" onClick={onClick} value="day">day</button>
            <button type="submit" className="mx-4" onClick={onClick} value="week">week</button>
            <button type="submit" className="mx-4" onClick={onClick} value="month">month</button>
            <button type="submit" className="mx-4" onClick={onClick} value="">show all</button>
        </div>
    )
}

Filter.propTypes = {}

export default Filter
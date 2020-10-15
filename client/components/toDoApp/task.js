import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Task = (props) => {
    const { category } = useParams()

    const deleteTask = async () => {
        await axios.delete(`/api/v1/tasks/${category}/${props.taskId}`)
        await axios.get(`/api/v1/tasks/${category}`)
          .then((tasks) => tasks.data)
          /* eslint-disable no-underscore-dangle */
          .then((tasks) => tasks.filter((item) => !item._isDeleted))
          .then((tasks) => props.setTasks(tasks))
    }

    return <div className="shadow-lg p-4 m-3 rounded-lg border-solid border-blue-500 border-2 relative flex justify-center items-center">
        <button className="absolute top-0 right-0" type="button" onClick={deleteTask}>X</button>
        {props.title}
    </div>
}

Task.propTypes = {}

export default Task
import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Task = (props) => {
    const { category } = useParams()

    const deleteTask = async () => {
        await axios
          .delete(`/api/v1/tasks/${category}/${props.taskId}`)
          .then(() => props.setUpdateTasks(props.updateTasks + 1))
        // await axios.get(`/api/v1/tasks/${category}`)
        //   .then((tasks) => tasks.data)
        //   /* eslint-disable no-underscore-dangle */
        //   .then((tasks) => tasks.filter((item) => !item._isDeleted))
        //   .then((tasks) => props.setTasks(tasks))
    }

    const updateStatus = async () => {
      await axios
        .patch(`/api/v1/tasks/${category}/${props.taskId}`, {
          title: props.title,
          status: 'done'
        })
        .then(() => props.setUpdateTasks(props.updateTasks + 1))
    }

    return (
      <div className="shadow-lg p-4 m-3 rounded-lg border-solid border-blue-500 border-2 relative">
        <button className="absolute top-0 right-0" type="button" onClick={deleteTask}>
          X
        </button>
        {props.status === 'done' || <button className="absolute top-0 left-0" type="button" onClick={updateStatus}>
          DONE
        </button>}
        <div className="uppercase my-2 font-bold">{props.title}</div>
        <div>Status: {props.status}</div>
      </div>
    )
}

Task.propTypes = {}

export default Task
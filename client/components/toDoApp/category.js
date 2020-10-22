import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import Add from './add'
import Task from './task'
import Header from './header'
import Filter from './filterTasks'

const Category = () => {
    const [tasks, setTasks] = useState([])
    const { category } = useParams()
    const [updateTasks, setUpdateTasks] = useState(0)

    useEffect(() => {
        async function get() {
          await axios.get(`/api/v1/tasks/${category}`)
            .then((allTasks) => allTasks.data)
            /* eslint-disable no-underscore-dangle */
            .then((allTasks) => allTasks.filter((item) => !item._isDeleted))
            .then((allTasks) => setTasks(allTasks))
        }
        get()
    }, [updateTasks])

    return (
      <div className="flex flex-col items-center">
        <Header />
        <h1 className="text-center text-4xl uppercase">{category}</h1>
        <Filter setUpdateTasks={setUpdateTasks} updateTasks={updateTasks} />
        <div className="flex justify-center flex-wrap w-3/4">
          {tasks.map((task) => (
            <Task
              key={task.taskId}
              setUpdateTasks={setUpdateTasks}
              updateTasks={updateTasks}
              {...task}
            />
          ))}
        </div>
        <Add setUpdateTasks={setUpdateTasks} updateTasks={updateTasks} />
      </div>
    )
}

Category.propTypes = {}

export default Category
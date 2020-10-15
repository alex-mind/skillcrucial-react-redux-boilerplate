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

    useEffect(() => {
        axios.get(`/api/v1/tasks/${category}`)
          .then((allTasks) => allTasks.data)
          /* eslint-disable no-underscore-dangle */
          .then((allTasks) => allTasks.filter((item) => !item._isDeleted))
          .then((allTasks) => setTasks(allTasks))
    }, [])

    return <div className="flex flex-col items-center">
        <Header />
        <h1 className="text-center text-4xl uppercase">{category}</h1>
        <Filter setTasks={setTasks} />
        <div className="flex justify-center flex-wrap w-3/4">
            {tasks.map((task) => <Task key={task.taskId} setTasks={setTasks} {...task} />)}
        </div>
        <Add setTasks={setTasks} />
    </div>
}

Category.propTypes = {}

export default Category
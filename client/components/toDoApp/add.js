import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Add = (props) => {
    const [value, setValue] = useState('')
    const { category } = useParams()

    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onClick = async () => {
        if (props.setTasks && value) {
            await axios.post(`/api/v1/tasks/${category}`, { title: value })
            await axios.get(`/api/v1/tasks/${category}`)
              .then((allTasks) => allTasks.data)
              /* eslint-disable no-underscore-dangle */
              .then((allTasks) => allTasks.filter((item) => !item._isDeleted))
              .then((allTasks) => props.setTasks(allTasks))
        }
        if (props.setCategories && value) {
            await axios.post(`/api/v1/${value}`, {})
            await axios.get(`/api/v1/categories`).then((categories) => props.setCategories(categories.data))
        }
        setValue('')
    }

    return <div>
        <input type="text" value={value} onChange={onChange} className="px-2 m-4 shadow-md rounded border-2 border-solid border-blue-500" />
        <button type="submit" onClick={onClick} className="px-2 rounded-lg border-2 border-solid border-blue-500">Add</button>
    </div>
}

Add.propTypes = {}

export default Add
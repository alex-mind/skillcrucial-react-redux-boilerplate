import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Add from './add'
import Header from './header'

const Categories = () => {
    const [categories, setCategories] = useState([])
    const [updateCategories, setUpdateCategories] = useState(0)

    useEffect(() => {
      async function get() {
        await axios
          .get('/api/v1/categories')
          .then((allCategories) => setCategories(allCategories.data))
      }
      get()
    }, [updateCategories])

    return (
      <div className="flex flex-col items-center">
        <Header />
        <h1 className="text-4xl uppercase">Categories</h1>
        <div className="flex flex-wrap justify-center">
          {categories.map((category) => {
            return (
              <div
                key={category}
                className="shadow-lg p-4 m-3 rounded-lg border-solid border-blue-500 border-2 relative"
              >
                <button
                  type="button"
                  className="absolute top-0 right-0"
                  onClick={async () => {
                    // e.stopPropagation()
                    await axios.delete(`/api/v1/${category}`)
                    await axios
                      .get('/api/v1/categories')
                      .then((allCategories) => setCategories(allCategories.data))
                  }}
                >
                  X
                </button>
                <Link to={`/todo/${category}`} className="uppercase">
                  {category}
                </Link>
              </div>
            )
          })}
        </div>
        <Add setUpdateCategories={setUpdateCategories} updateCategories={updateCategories} />
      </div>
    )
}

Categories.propTypes = {}

export default Categories
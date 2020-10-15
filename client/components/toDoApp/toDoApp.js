import React from 'react'
import { Route } from 'react-router-dom'
import Categories from './categories'
import Category from './category'

const toDoApp = () => {
    return (
        <div>
            <Route exact path="/todo" component={() => <Categories />} />
            <Route exact path="/todo/:category" component={() => <Category />} />
        </div>
    )
}

toDoApp.propTypes = {}

export default toDoApp
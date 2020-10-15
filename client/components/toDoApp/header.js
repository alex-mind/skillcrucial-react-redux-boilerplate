import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Header = () => {
    const { category } = useParams()

    return <nav className="flex items-center justify-between w-screen bg-blue-500 h-16">
        <div className="mx-4 text-3xl">ToDo App</div>
        {category && <Link to="/todo" className="mx-4 text-3xl">Go Back</Link>}
    </nav>
}

Header.propTypes = {}

export default Header
import React from 'react'
import Header from './header'
import Products from './products'

const Shopping = () => {
  return (
    <div>
      <Header basket={1}/>
      <div className="w-screen flex justify-center">
        <Products />
      </div>
    </div>
  )
}

Shopping.propTypes = {}

export default Shopping
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Product from './product'

import { downloadProducts } from '../../redux/reducers/products'

const Products = () => {
  const products = useSelector((s) => s.products)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!products.length) {
      dispatch(downloadProducts())
    }
  }, [])

  return (
    <div className="flex flex-wrap w-4/5 justify-between h-screen mt-12">
      {products.map((product) => {
        return <Product key={product.id} {...product} />
      })}
    </div>
  )
}

Products.propTypes = {}

export default Products
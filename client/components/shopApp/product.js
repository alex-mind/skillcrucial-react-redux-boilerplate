import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/cart'

const Product = (props) => {
  const inCart = useSelector((s) =>
    Object.keys(s.cart)
      .filter((product) => product === props.id)
      .reduce((acc, rec) => acc + s.cart[rec], 0)
  )
  const currency = useSelector((s) => s.currency)
  const dispatch = useDispatch()

  return (
    <div className="card h-auto w-1/5 m-2 flex flex-col items-center justify-end shadow-lg rounded-lg p-5">
      <img className="card__image justify-self-start my-2" src={props.image} alt={props.title} />
      <div className="card__title text-2xl bold text-center">{props.title}</div>
      <div className="card__price">{props.price} {currency}</div>
      {inCart ? `In cart: ${inCart}` : ''}
      <button type="submit" onClick={() => {
        dispatch(addToCart(props))
      }}>Add to basket</button>
    </div>
  )
}

Product.propTypes = {}

export default Product
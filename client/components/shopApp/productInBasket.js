import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addToCart, deleteFromCart } from '../../redux/reducers/cart'

const ProductInBasket = (props) => {
  const amount = useSelector((s) => s.cart[props.id])
  const currency = useSelector((s) => s.currency)
  const dispatch = useDispatch()

  return (
    <div className="flex flex-row justify-around items-center px-1 py-3">
      <img className="product__image" src={props.image} alt={props.title} />
      <h2 className="product__title text-2xl bold">{props.title}</h2>
      <div className="product__price">
        {props.price} {currency}
      </div>
      <div className="product__amount w-20 text-center">{amount} pcs.</div>
      <div className="product__total_price w-30 text-center">
        Total: {(props.price * amount).toFixed(2)} {currency}
      </div>
      <button
        type="submit"
        className="product__add text-3xl"
        onClick={() => {
          dispatch(addToCart(props))
        }}
      >
        +
      </button>
      <button
        type="submit"
        className="product__remove text-3xl"
        onClick={() => {
          dispatch(deleteFromCart(props))
        }}
      >
        -
      </button>
    </div>
  )
}

ProductInBasket.propTypes = {}

export default ProductInBasket
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import classnames from 'classnames'
import axios from 'axios'

import { sortByPrice, sortByName, updatePrices } from '../../redux/reducers/products'
import { updateCurrency } from '../../redux/reducers/currency'

const Header = (props) => {
  const dispatch = useDispatch()
  const currency = useSelector((s) => s.currency)
  const buttonStyle = 'mx-2'
  const productsInBasket = useSelector((s) => Object.values(s.cart).reduce((acc, rec) => acc + rec, 0))

  const updateProductPrices = (currencyTo) => {
    if (currencyTo !== currency) {
      axios(`https://api.exchangeratesapi.io/latest?symbols=${currencyTo}&base=${currency}`)
        .then(({ data }) => dispatch(updatePrices(data.rates[currencyTo])))
        .then(() => dispatch(updateCurrency(currencyTo)))
    }
  }

  return (
    <div className="flex justify-around items-center w-screen fixed bg-blue-500 h-12">
      <Link id="brand-name" className="bold text-3xl uppercase tracking-widest" to="/shop">
        Shop
      </Link>
      <div>
        <button
          type="submit"
          onClick={() => updateProductPrices('USD')}
          className={classnames(buttonStyle)}
        >
          USD
        </button>
        |
        <button
          type="submit"
          onClick={() => updateProductPrices('EUR')}
          className={classnames(buttonStyle)}
        >
          EUR
        </button>
        |
        <button
          type="submit"
          onClick={() => updateProductPrices('CAD')}
          className={classnames(buttonStyle)}
        >
          CAD
        </button>
      </div>
      <div className="flex w-40 justify-around">
        Sort by:
        <button id="sort-price" type="submit" onClick={() => dispatch(sortByPrice())}>
          price
        </button>
        <button id="sort-name" type="submit" onClick={() => dispatch(sortByName())}>
          name
        </button>
      </div>
      <div className="flex flex-col w-40">
        Products in cart: {productsInBasket}
        {props.basket ? <Link id="order-count" to="/shop/basket">
          Go to Cart
        </Link> : ''}
      </div>
    </div>
  )
}

Header.propTypes = {}

export default Header
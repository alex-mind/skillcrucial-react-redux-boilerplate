import React from 'react'
import { useSelector } from 'react-redux'
import Header from './header'
import ProductInBasket from './productInBasket'

const Basket = () => {
  const products = useSelector((s) => s.products)
  const cart = useSelector((s) => s.cart)
  const currency = useSelector((s) => s.currency)
  const totalAmount = Object.keys(cart).reduce((acc, rec) => {
    const product = products.filter((productToFind) => productToFind.id === rec)[0]
    return acc + product.price * cart[rec]
  }, 0)

  return (
    <div>
      <Header basket={0} />
      <div className="w-screen flex flex-col items-center">
        <div className="uppercase text-5xl mt-12">Cart</div>
        <div className="w-4/5 my-3 flex flex-col shadow-lg rounded-lg">
          {Object.keys(cart).map((productInCart) => {
            const product = products.filter(
              (productToFind) => productToFind.id === productInCart
            )[0]
            return <ProductInBasket key={product.id} {...product} />
          })}
        </div>
        {totalAmount ? (
          <div className="total-amount w-4/5 text-3xl text-right">
            {totalAmount.toFixed(2)} {currency}
          </div>
        ) : (
          ''
        )}
        {totalAmount ? (
          <div className="flex w-4/5 justify-end text-4xl my-3">
            <button
              type="submit"
              onClick={() => alert("Unfortunately, you can't buy anything here for now :(")}
            >
              BUY
            </button>
          </div>
        ) : (
          <div className="text-2xl">Nothing here for now...</div>
        )}
      </div>
    </div>
  )
}

Basket.propTypes = {}

export default Basket

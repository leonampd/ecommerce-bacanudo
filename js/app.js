(function(){
  const cart = []

  const getAllElements = selector => document.querySelectorAll(selector)
  const getElement = selector => document.querySelector(selector)

  const saveCart = (cart) => {
    sessionStorage.clear()
    sessionStorage.setItem('cart', JSON.stringify(cart))
  }

  const getCart = () => {
    let cart = sessionStorage.getItem('cart')
    return cart !== null ? JSON.parse(cart) : []
  }
  
  const addToCart = (event) => {
    const target = event.srcTarget || event.srcElement

    let product = {
      id: target.getAttribute('data-product-id'),
      name: target.getAttribute('data-product-name'),
      price: target.getAttribute('data-product-price'),
    }

    cart.push(product)

    return saveCart(cart)
  }
  
  const bindAddToCart = () => {
    const buttons = getAllElements('.add-to-cart').forEach((button) => {
      button.addEventListener('click', addToCart)
    })
  }

  const createInputsForProduct = product => {
    let id = document.createElement('input')
    id.setAttribute('type', 'hidden')
    id.setAttribute('value', product.id)
    id.setAttribute('name', 'id[]')

    let name = document.createElement('input')
    name.setAttribute('type', 'hidden')
    name.setAttribute('value', product.name)
    name.setAttribute('name', 'name[]')

    let price = document.createElement('input')
    price.setAttribute('type', 'hidden')
    price.setAttribute('value', product.price)
    price.setAttribute('name', 'price[]')

    getElement('#carrinho').appendChild(id)
    getElement('#carrinho').appendChild(name)
    getElement('#carrinho').appendChild(price)
    getElement('#carrinho').submit();
  }

  const placeOrder = () => getCart().forEach(createInputsForProduct)

  const bindPlaceOrder = () => getElement('#place-order')
    .addEventListener('click', placeOrder)

  bindPlaceOrder()
  bindAddToCart()
})();
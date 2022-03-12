let carts = document.querySelectorAll('.add-cart');

let products = [

  {
    name: 'رژ لب جامد مات کالیستا',
    tag: 'calista-lipStick',
    price: 40,
    inCart: 0
  },
  {
    name: 'رژ لب مایع ساتین مات کالیستا',
    tag: 'calista-liquid-lipStick',
    price: 38,
    inCart: 0
  },
  {
    name: 'رژ گونه کالر اند آرت کالیستا',
    tag: 'calista-stardustBlush',
    price: 50,
    inCart: 0
  },
  {
    name: 'سایه چشم چهارتایی دیزاین کالیستا',
    tag: 'calista-eyeshadow',
    price: 70,
    inCart: 0
  },
  {
    name: 'کانسیلر کاورآپ کالیستا',
    tag: 'calista-canceler',
    price: 38,
    inCart: 0
  },
  {
    name: 'کرم پودر بادوام مات کالیستا',
    tag: 'calista-foundation',
    price: 60,
    inCart: 0
  },
  {
    name: 'پنکک فشرده نرم کالیستا',
    tag: 'calista-pankake',
    price: 67,
    inCart: 0
  },



]

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}


function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem('cartNumbers');

  if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
  }
}

function cartNumbers(product, action) {

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if (action == "decrease") {
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart span').textContent = productNumbers - 1;
  } else if (productNumbers) {
    localStorage.setItem('cartNumbers', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
  } else {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItems(product);
}


function setItems(product) {

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }

  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product, action) {
  let cartCost = localStorage.getItem('totalCost');

  if (action == "decrease") {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost - product.price)
  } else if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price)
  } else {
    localStorage.setItem("totalCost", product.price);
  }

}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cart-container");
  let totalCartContainer = document.querySelector(".totalCart-container");
  let cartCost = localStorage.getItem('totalCost');

  if (cartItems && productContainer) {
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
        
        <div class="row   my-2 khat">

                
            <div class="col-md-1  text-center  my-auto">
                 <i class="fas fa-times text-danger"></i>
            </div>
            <div class="col-md-2  my-auto text-center">
                <img src="./img/${item.tag}.jpg" alt="">
            </div>
            <div class="col-md-3   my-auto text-center">
                  <h5>${item.name}</h5>
            </div>
            <div class="col-md-2  text-center my-auto">
                <span>${item.price}.000 تومان</span>
            </div>

            <div class="col-md-2  text-center my-auto">
                  <i class="fas fa-plus p-2 m-1 increase"></i><input type="text" value="${item.inCart}" id="numOfProduct" class="numOfProduct"><i class="fas fa-minus p-2 m-1 decrease"></i>
            </div>
            <div class="col-md-2   text-center my-auto">
                  <span>${item.inCart*item.price}000 تومان</span> 
            </div>
        </div>
         
        
        `;
    });

    totalCartContainer.innerHTML = `
      <div class="d-flex justify-content-center justify-content-md-end ">
          <div class="total-basket p-3 text-center my-4">
              <span>مبلغ قابل پرداخت:</span>
              <span class="mr-0">${cartCost}000تومان</span>
          </div>
       </div>

      `;

  }
  deleteButtons();
  manageQuantity();
}

function deleteButtons() {
  let deleteButtons = document.querySelectorAll('.khat .fa-times');
  let productName;
  let productNumbers = localStorage.getItem('cartNumbers');
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  let cartCost = localStorage.getItem('totalCost');

  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', () => {
    
      productName = deleteButtons[i].parentElement.parentElement.querySelector('.col-md-2 img').src.substr(22).replace('.jpg', '');

      
      localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

      localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

      delete cartItems[productName];

      localStorage.setItem('productsInCart', JSON.stringify(cartItems));

      displayCart();
      onLoadCartNumbers();
    });
  }
}

function manageQuantity() {
  let decreaseButton = document.querySelectorAll('.decrease');
  let increaseButton = document.querySelectorAll('.increase');

  let cartItems = localStorage.getItem('productsInCart');

  let currentQuantity = 0;
  let currentproduct = "";
  cartItems = JSON.parse(cartItems);



  for (let i = 0; i < decreaseButton.length; i++) {
    decreaseButton[i].addEventListener('click', () => {
      currentQuantity = decreaseButton[i].previousSibling.value;
      
      currentproduct = decreaseButton[i].parentElement.parentElement.querySelector('.col-md-2 img').src.substr(22).replace('.jpg', '');
     

      if (cartItems[currentproduct].inCart > 1) {
        cartItems[currentproduct].inCart -= 1;
        cartNumbers(cartItems[currentproduct], "decrease");
        totalCost(cartItems[currentproduct], "decrease");
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        displayCart();
      }

    })
  }

  for (let i = 0; i < increaseButton.length; i++) {
    increaseButton[i].addEventListener('click', () => {
      currentQuantity = increaseButton[i].nextSibling.value;
     
      currentproduct = increaseButton[i].parentElement.parentElement.querySelector('.col-md-2 img').src.substr(22).replace('.jpg', '');
      

      cartItems[currentproduct].inCart += 1;
      cartNumbers(cartItems[currentproduct]);
      totalCost(cartItems[currentproduct]);
      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      displayCart();

    })
  }

}
onLoadCartNumbers();
displayCart();
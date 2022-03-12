let carts = document.querySelectorAll('.add-cart');

let products=[
  {
      name:'کرم ضد آفتاب ضد لک اسپات Spf50 حجم ۳۰ میلی لیتر بایودرما',
      tag:'bioderma-zedAftab50spf',
      price:170,
      inCart:0
    },
    {
      name:'کرم ضدآفتاب کرم پودری 2در1 هیدرودرم',
      tag:'hydroderm-zedAftabCreamPoudri',
      price:100,
      inCart:0
    },
    {
      name:'کرم ضد آفتاب SPF30+ بدون رنگ مینرال سینره',
      tag:'cinere-zedAftab',
      price:50,
      inCart:0
    },
    {
      name:'کرم ضد آفتاب وضد چروک رنگی سان سیف',
      tag:'sunsafe-zedAftabVazedChorouk',
      price:98,
      inCart:0
    },
    {
      name:'کرم ضد آفتاب دور چشم رنگی سان سیف',
      tag:'sunsafe-zedaftabDorCheshm',
      price:68,
      inCart:0
    },
    {
      name:'کرم ضدآفتاب رنگی کرم پودری و پرایمری مکیسان با اس پی اف 50 سان سیف',
      tag:'sunsafe-zrdAftabVaprimare',
      price:116,
      inCart:0
    },

]

/* execute when add to cart clicked */
for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener('click', () => {

    let product_quantity = parseInt($('#numOfProduct').attr('value'));
    localStorage.setItem("product_quantity", product_quantity);
    // reset quantity
    $('#numOfProduct').attr('value', 1);
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

/* show products number in top of the page in basket icon */
function cartNumbers(product, action) {

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  // get product quantity
  product_quantity = localStorage.getItem('product_quantity');
  product_quantity = parseInt(product_quantity);

  if (action == "decrease") {
    // update value
    localStorage.setItem('cartNumbers', productNumbers - 1);
    document.querySelector('.cart span').textContent = productNumbers - 1;
  } else if (productNumbers) { // if product exist in basket update it's quantity

    localStorage.setItem('cartNumbers', productNumbers + product_quantity); // sum of old quantity and new added products
    document.querySelector('.cart span').textContent = productNumbers + product_quantity;
  } else { // set products number for first time.
    localStorage.setItem('cartNumbers', product_quantity); // set quantity for the first time.
    document.querySelector('.cart span').textContent = product_quantity;
  }

  setItems(product);
}


function setItems(product) {

  let cartItems = localStorage.getItem('productsInCart'); // get all products from local storage that are in basket.
  cartItems = JSON.parse(cartItems);
  if (cartItems != null) { // if any item exists in basket
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product
      }
    }

    product_quantity = localStorage.getItem('product_quantity');
    product_quantity = parseInt(product_quantity);
    cartItems[product.tag].inCart += product_quantity;

    localStorage.removeItem("product_quantity");

  } else {
    product_quantity = localStorage.getItem('product_quantity');
    product_quantity = parseInt(product_quantity);
    product.inCart = product_quantity;

    localStorage.removeItem("product_quantity");
    cartItems = {
      [product.tag]: product
    }

  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems))
}

function totalCost(product, action) {
  let cartCost = localStorage.getItem('totalCost');

  if (action == "decrease") { // update total price if one of the products is removed from basket.
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost - (product.price * product.inCart));
  } else if (cartCost != null) { // calculate total price if more than one product is in basket.
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + (product.price * product.inCart));
  } else { // calculate total price if only one product is in basket.
    localStorage.setItem("totalCost", product.price * product.inCart);
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
  // manageQuantity();
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
      // let productName=deleteButtons[i].parentElement.parentElement.getElementsByClassName('col-md-3')[0].textContent.trim().replace(/ /g,'');
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


onLoadCartNumbers();
displayCart();
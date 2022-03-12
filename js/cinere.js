let carts=document.querySelectorAll('.add-cart');

let products=[
 
  {
    name:'ژل شوینده آنتی پولوشن پوست چرب سینره',
    tag:'cinere-zelShoyande',
    price:30,
    inCart:0
  },
  {
    name:'کرم ضد آفتاب SPF30+ بدون رنگ مینرال سینره',
    tag:'cinere-zedAftab',
    price:50,
    inCart:0
  },
  {
    name:'تونر پاک کننده صورت سینره',
    tag:'cinere-toner',
    price:27,
    inCart:0
  },
  {
    name:'شیر پاک کن پوست معمولی و خشک سینره',
    tag:'cinere-ShirPakKon-postKhosk',
    price:32,
    inCart:0
  },
  {
    name:'کرم دور چشم بالای 40 سال سینره',
    tag:'cinere-kermDorCheshm',
    price:120,
    inCart:0
  },
  {
    name:'شامپو ضد ریزش مخصوص بانوان سینره',
    tag:'cinere-shampoZedRizesh',
    price:33,
    inCart:0
  },
  {
    name:'سرم تقویت کننده و ضد ریزش ابرو سینره',
    tag:'cinere-taghviatAbrou',
    price:51,
    inCart:0
  },
  {
    name:'دئودورانت زنانه با رایحه بهاری سینره',
    tag:'cinere-Deoderant',
    price:22,
    inCart:0
  },


]

for(let i=0; i<carts.length;i++){
  carts[i].addEventListener('click', ()=>{
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}


function onLoadCartNumbers(){
  let productNumbers=localStorage.getItem('cartNumbers');

  if(productNumbers){
    document.querySelector('.cart span').textContent=productNumbers;
  }
}
function cartNumbers(product){
  
  let productNumbers=localStorage.getItem('cartNumbers');
  
 
  productNumbers=parseInt(productNumbers);
  if(productNumbers){
    localStorage.setItem('cartNumbers',productNumbers+1);
    document.querySelector('.cart span').textContent=productNumbers+1;
  } else{
    localStorage.setItem('cartNumbers',1);
    document.querySelector('.cart span').textContent=1;
  }
  setItems(product);
}


 function setItems(product){
 
  let cartItems=localStorage.getItem('productsInCart');
  cartItems=JSON.parse(cartItems);
  if(cartItems !=null){
    if(cartItems[product.tag] == undefined){
      cartItems={
        ...cartItems,
        [product.tag]:product
      }
    }
    cartItems[product.tag].inCart +=1;
  }else{
    product.inCart=1;
    cartItems={
        [product.tag]: product
   }
  
  }
  
   localStorage.setItem("productsInCart",JSON.stringify(cartItems))
 }
 function totalCost(product){
 let cartCost=localStorage.getItem('totalCost');
 


 if(cartCost != null){
  cartCost=parseInt(cartCost);
  localStorage.setItem("totalCost",cartCost + product.price)
 }else{
  localStorage.setItem("totalCost",product.price);
 }
  
 }
 function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".cart-container");
    let totalCartContainer=document.querySelector(".totalCart-container");
    let cartCost=localStorage.getItem('totalCost');

    if(cartItems && productContainer){
      productContainer.innerHTML='';
      Object.values(cartItems).map(item =>{
        productContainer.innerHTML +=`
        
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
                  <i class="fas fa-plus p-2 m-1" onclick="plus()"></i><input type="text" value="${item.inCart}" id="numOfProduct" class="numOfProduct"><i class="fas fa-minus p-2 m-1" onclick="minus()"></i>
            </div>
            <div class="col-md-2   text-center my-auto">
                  <span>${item.inCart*item.price}000 تومان</span> 
            </div>
        </div>
         
        
        `;
      });

      totalCartContainer.innerHTML +=`
      <div class="d-flex justify-content-center justify-content-md-end ">
          <div class="total-basket p-3 text-center my-4">
              <span>مبلغ قابل پرداخت:</span>
              <span class="mr-0">${cartCost}000تومان</span>
          </div>
       </div>

      `;

    }
 }
onLoadCartNumbers();
displayCart();
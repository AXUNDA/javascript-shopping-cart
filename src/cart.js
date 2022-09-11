let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');
let generateCartItems = ()=>{
      if(basket.length!=0){
            return shoppingCart.innerHTML= basket.map((x)=>{
                  let {id,item} = x
                  let search = shopItems.find((x)=>x.id ==id) || []
                  // console.log(search)
                  return `

                        <div class="cart-item ">
                        <img width="100" src=${search.img} alt="">
                        <div class="details">
                        <div class="title-price-x">
                        <h4 class="title-price">
                        <p>${search.name}</p>
                        <p class="cart-item-price">$${search.price}</p>
                        
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-octagon"></i>

                        </div>
                              <div class="buttons">
                                                      <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                                                      <div id=${id} class="quantity">${item}</div>
                                                      <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                                                </div>
                        
                        <h3>$${item*search.price}</h3>
                              
                              </div>

                        



                        
                        
                        </div>
                        
                        
                  
                  `
            }).join("")

      }else{
            shoppingCart.innerHTML=``
            label.innerHTML=`
            <h2>cart is empty</h2>
            <a href="index.html">
            <button class="HomeBtn">Back to Home page</button>

            
            </a>

            
            
            `

      }
}


let basket = JSON.parse(localStorage.getItem("basket")) || [];
let increment = (id) =>{
      // console.log(id)
      let search = basket.find((x)=>x.id ===id )
      if (search === undefined){
            basket.push({id:id,item:1})
      }else{
            search.item ++
      }
      // console.log(basket)


      update(id)
      generateCartItems()
     totalAmount()


      localStorage.setItem("basket",JSON.stringify(basket))


}

let decrement = (id)=>{
      let search = basket.find((x)=>x.id ===id )
      if(search === undefined) return;
      else if (search.item === 0) return;
      else{
            search.item --
      }
      // console.log(basket)

      update(id)
      basket=basket.filter((x)=>x.item !== 0)
      generateCartItems()
     totalAmount()



      localStorage.setItem("basket",JSON.stringify(basket))

      // calculation()
       
}
let update =(id)=>{
      let search = basket.find((x)=>x.id ===id)
      document.getElementById(id).innerText = search.item
      // console.log(search)
      calculation()
      

}

let calculation =()=>{
      let cartIcon = document.getElementById("cartAmount")
      cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=> x+y,0)
      // console.log()

}
let removeItem = (id)=>{
      // alert(id)
      // console.log(basket)
      basket= basket.filter((x)=>x.id !==id)
      localStorage.setItem("basket",JSON.stringify(basket))

      generateCartItems()
     totalAmount()

      calculation()



}

let totalAmount= ()=>{
      if(basket.length != 0){
            let amount =basket.map((x)=>{
                  let {item,id}=x
                  let search = shopItems.find((x)=>x.id ==id) || []
                  return search.price * item

            })
           total= amount.reduce((x,y)=> x+y,0)
            console.log(total)
            label.innerHTML= `
            <h2>Total bill :$${total}</h2>
            <button class="checkout">checkout</button>
            <button onclick="clearCart()" class="clear">clear cart</button>

            
            
            `

      }else {
            return;
      }

}


let clearCart= ()=>{
      basket =[]
      localStorage.setItem('basket',JSON.stringify(basket))
      calculation()

      generateCartItems()
}
calculation()
generateCartItems()
totalAmount()
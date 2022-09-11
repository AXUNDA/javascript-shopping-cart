let shop = document.getElementById("shop")



let basket = JSON.parse(localStorage.getItem("basket")) || [];
// let basket = []
// console.log(basket)



let generateShop = ()=>{
      return (shop.innerHTML = shopItems.map((x)=>{
            let {id,img,name,price,desc} = x
            
            let search =basket.find((y) => y.id == id) || [];
            // console.log(search)
          
           
           
            return ` 
            <div id=product-id-${id} class="item">
                        <img width="220" src=${img} alt="">
                        <div class="details">
                              <h3>${name}</h3>
                              <p>${desc}</p>
                              <div class="price-quantity">
                                    <h2>$ ${price}</h2>
                                    <div class="buttons">
                                          <i onclick="decrement(${id})" class="bi bi-dash-square"></i>
                                          <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                                          <i onclick="increment(${id})" class="bi bi-plus-square"></i>
                                    </div>
                              </div>
                        </div>
      
      
                  </div>
            
            
            
            `;
            

      }).join(""))


}

generateShop()
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
calculation()
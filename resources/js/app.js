import axios from 'axios'



let addToCart=document.querySelectorAll('.add-to-cart')
let cartController=document.querySelector('#cart')
function updateCart(pizza)
{
    axios.post('/update-cart',pizza).then(res=>{
        console.log(res)
        console.log(cartController)
        cartController.innerText=res.data.totalQty

       
    })
}


addToCart.forEach(btn => {
    btn.addEventListener('click',(e)=>
    {

        let pizza=JSON.parse(btn.dataset.pizzas);
        updateCart(pizza);
        console.log(pizza);
    })
    
});

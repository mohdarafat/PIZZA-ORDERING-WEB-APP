function cartController() {
  return {
    cart(req, res) {
      res.render("cart/cart"); 
    },

    update(req,res)
    {
           //for the first time creating cart & adding basic obj structure
      if(!req.session.cart)
      {
        req.session.cart={
          items:{},
          totalQty:0,
          totalPrice:0
        }
      }
        let cart=req.session.cart
        console.log(req.body);

        //check if item doesnot exist in cart
        if(!cart.items[req.body._id])
      {
        cart.items[req.body._id]={
          items:req.body,
          qty:1,
          
        }
        cart.totalQty=cart.totalQty + 1;
        cart.totalPrice = cart.totalPrice +req.body.price;
      } else{
        cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
        cart.totalQty = cart.totalQty + 1
        cart.totalPrice =  cart.totalPrice + req.body.price
    }
     
      

      return res.json({totalQty :req.session.cart.totalQty})
      console.log(pizza.qty);
    }
  };
}

module.exports = cartController;

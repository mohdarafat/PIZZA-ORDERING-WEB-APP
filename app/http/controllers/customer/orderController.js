const Order=require("../../../models/order")
const moment=require('moment')
function orderController () {
    return {
        store(req, res) 
        {
            // Validate request
            const { phone, address } = req.body
            if(!phone || !address) 
            {
                req.flash('error','all fields required')
                return res.redirect('/login')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone,
                address
            })
            order.save().then(result=>{
           req.flash('success','order placed!!')
           delete req.session.cart
           return res.redirect('/customer/orders')
          }).catch(err=>{
            req.flash('error','something went wrong')
           return res.redirect('/register')

          })
        },
       async index(req,res){
            const orders=await Order.find({customerId:req.user._id})
                 res.render('cart/orders',{orders:orders,moment:moment})
                console.log(orders)
            
        }
}
}

module.exports=orderController
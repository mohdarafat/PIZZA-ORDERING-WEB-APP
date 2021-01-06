const homeController = require("../app/http/controllers/home/homeController");
const authController = require("../app/http/controllers/auth/authController");
const guest=require("../app/http/middlewares/guest")
const cartController = require("../app/http/controllers/customer/cartController");
const orderController = require("../app/http/controllers/customer/orderController");
function initRoutes(app) {
  app.get("/", homeController().index);

 

  app.get("/login", guest,authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register",guest, authController().register);
  app.post("/register", authController().postRegister);
  app.get("/cart", cartController().cart);
  app.post('/update-cart',cartController().update);
  app.post("/logout", authController().logout);
  //customers
  
  app.post("/orders",orderController().store);
  app.get("/customer/orders",orderController().index)
}

module.exports = initRoutes;

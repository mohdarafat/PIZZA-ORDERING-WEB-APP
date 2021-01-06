const User=require('../../../models/User')
const bcrypt= require('bcrypt');
const passport = require('passport');
function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    postLogin(req,res,next)
    {
      passport.authenticate('local',(err,user,info)=>{
       if(err)
       {
         req.flash('error',info.message)
         return next(err)
       }if(!user)
       {
         req.flash('error',info.message)
         return res.redirect('/login')
       }
       req.logIn(user,(err)=>{
         if(err)
         {
          req.flash('error',info.message)
          return next(err)
         }
         return res.redirect('/')
       })


      })(req,res,next)

    },

    register(req, res) {
      res.render("auth/register");
    },
      async postRegister(req,res)
    {
      const {name,email,password} =req.body;
      //validate
      if(!name||!email||!password)
      {
        req.flash('error','All fields required!!')
        req.flash('name',name)
        req.flash('email',email)
        return res.redirect('/register')
      }
      
      //for different email
      User.exists({email: email},(err,result)=>
      {
       if(result)
       {
        req.flash('error','email already exists')
        req.flash('name',name)
        req.flash('email',email)
        return res.redirect('/register')
       }
      })
       //hashed
       const hashedpassword= await bcrypt.hash(password,10)

       //create user
       const user =new User({
         name:name,
         email:email,
         password:hashedpassword
       })
       user.save().then((user)=>{
       
       return res.redirect('/')
       }).catch(err=>{
        req.flash('error','Some Error Exist')

        return res.redirect('/register')

       })
     
    
    },

    logout(req,res)
    {
      req.logout()
      
     return res.redirect('/login')
    }
  };
}


module.exports = authController;

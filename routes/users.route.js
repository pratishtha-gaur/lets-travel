let bcrypt= require('bcrypt');
let User= require('../models/user.model').User ;
let express= require('express');
let router= express.Router();
let auth= require('../controllers/auth');

router.post('/login', async (req,resp)=>{
    let email= req.body.email;
    let password = req.body.password;
    let users= await User.find().where({email:email});
    if(users.length>0){
        let comparisonResult= await bcrypt.compare(password, users[0].password);
        if(comparisonResult){
            let token= auth.generateToken(users[0]);
            resp.cookie('auth_token',token);
            resp.send({
                redirectUrl: '/admin',
                message: 'success'
            });
        }else{
            resp.send({message: 'rejected'});
        }
    }else{
        resp.send({message: 'rejected'});
    }
})

router.post('/register', async (req,resp)=>{
    let email= req.body.email;
    let password = req.body.password;
    let users= await User.find().where({email:email});
    if(users.length==0){
        let encryptedPass= await bcrypt.hash(password, 12);
        let newUser= new User({
            email, 
            password: encryptedPass});
        await newUser.save();
        resp.send({message: 'done'});
    }else{
        resp.send({message: 'rejected'});
    }
})

module.exports = router;
let express= require('express');
let app= express();
let mongoose= require('mongoose');
let multer= require('multer');
let cookieParser= require('cookie-parser');
let postsRouter= require('./routes/posts.route');
let CallbackRequest= require('./models/callback-request.model').CallbackRequest;
let callbackRequestsRouter= require('./routes/callback-request.route');
let emailsRouter= require('./routes/email.route');
let usersRouter= require('./routes/users.route');
let auth = require('./controllers/auth');
let Post= require('./models/post.model').Post;

app.use(express.static('public'));

app.set('view engine','ejs');
app.use(cookieParser());

mongoose.connect('mongodb://localhost/travels', {useNewUrlParser: true, useUnifiedTopology : true});

app.use(express.json());
let imageStorage= multer.diskStorage({
    destination: (req, file, cb)=> cb(null, 'public/images'),
    filename: (req, file, cb)=> cb(null, file.originalname)
})

app.use(multer({storage: imageStorage}).single('imageFile'));



app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestsRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);

app.get('/landmark', async (req,resp)=>{
    let id= req.query.id;
    let post= await Post.findOne({id:id})
    resp.render('landmark', {
        title : post.title,
        imageUrl: post.imageUrl,
        date: post.date,
        text: post.text
    })
})

app.get('/admin', (req,resp)=>{
    let token= req.cookies['auth_token'];
    if(token && auth.checkToken(token)){
        resp.render('admin');
    }else{
        resp.redirect('/login');
    }
})

app.get('/login', (req,resp)=>{
    let token= req.cookies['auth_token'];
    if(token && auth.checkToken(token) ){
        resp.redirect('/admin');
    }else{
        resp.render('login');
    }
})

let port= process.env.PORT || 3000;
app.listen(port , ()=> console.log(`listening ${port}....`));
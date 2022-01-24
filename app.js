const express = require ('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const { renderFile } = require('ejs');

//setting up express app
const app = express();
//connect to mongodb
const dbURI = 'mongodb+srv://nelson:nelson123@nodeblog.vlnul.mongodb.net/node-blog?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) =>app.listen(3000))
.catch((err) => console.log(err));

//register view engine
app.set('view engine', 'ejs');


//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(morgan('dev'));


//mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) =>{
//     const blog = new Blog({
//         title: 'Second new blog',
//         snippet: 'about my new blog',
//         body: 'more about my new blog'
//     });

//     blog.save()
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) =>{
//             console.log(err);
//         });
// });

//To retrieve all blogs we use another handler and a find method
// app.get('/all-blogs',(req, res) => {
//     Blog.find()
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch((err) =>{
//         console.log(err);
//     });
// });

// app.get('/single-blog', (req, res) =>{
//     Blog.findById('61ed728e511dd6f8ff574d31')
//     .then((result) =>{
//         res.send(result)
//     })
//     .catch((err) =>{
//         console.log(err);
//     });
// });


//routes
app.get('/', (req, res) =>{
    res.redirect('/blogs')
    // const blogs =[
    //     {title: 'Nelson Collins', snippet: 'Software Developer'},
    //     {title: 'Nelson Collins', snippet: 'Software Developer'},
    //     {title: 'Nelson Collins', snippet: 'Software Developer'},
    // ];
    // res.render('index' , {title: 'Home', blogs})
    //res.sendFile('./views/index.html', {root: __dirname})
    // res.send('<p>This is home page</p>')
});
app.get('/about', (req, res) =>{
    res.render('about', {title: 'About'});
    //res.sendFile('./views/about.html', {root: __dirname})
    //res.send('<p>This is about page</p>')
});

//redirects
// app.get('/about-us',(req, res)=>{
//     res.redirect('/about');
// });


//blog routes
app.use('/blogs', blogRoutes);

//404 page using --use-- middleware
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'})
    //res.status(404).sendFile('./views/404.html', {root: __dirname})
});
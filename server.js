const http = require('http');
const fs = require ('fs');
const _ = require ('lodash');

const server = http.createServer((req, res)=>{
    //lodash
    const add = _.random(20, 100);
    console.log(add);
    res.setHeader('Content-Type', 'text/html');

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-me':
            res.statusCode = 301;
            res.setHeader('Location', '/about')
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 400;
            break;
    }
    //sending an html file
    fs.readFile(path, (err, data) =>{
        if(err){
            console.log(err);
            res.end();
        }else{
            // res.write(data);
            res.end(data);
        }
    })
    // res.write('<h1>Hello Nelson</h1>');
    // res.write('<h2>Welcome to Lithuania</h2>');
    // res.write('<p>How is the weather like</p>');
    // res.end();
});

server.listen(3000, 'localhost', ()=>{
    console.log('listening to the made request on port 3000')
});

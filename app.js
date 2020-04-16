'use strict'
// const express = require ('express'); 
// const bodyParser = require ('body-parser');
// const mongoose = require('mongoose');

// const Posts = require ('./models/post');

// const app = express ();
// const port = process.env.PORT || 3002; 

// app.use(bodyParser.urlencoded({extended: false})); 
// app.use(bodyParser.json());

// //post
// app.get('/post', (req, res) => {
// });
// app.get('/post/:postId', (req, res) => {
// });

// app.post('/post', (req, res) => {
//     console.log('post api product');
//     console.log(req.body);

//     let post = new Posts();
//     post.username = req.body.username; 
//     post.nickname = req.body.nickname; 
//     post.title = req.body.title; 
//     post.text = req.body.text; 
//     post.date = req.body.date; 
//     post.comments = req.body.comments; 

//     post.save((err, postStored)=>{
//         if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
//         res.status(200).send({post: postStored})
//     })
    
// });

// app.delete('/post/:postId', (req, res) => {
// });

// app.put('/post/:postId', (req, res) => {
// });

// //comments
// app.post('/post/comments', (req, res) => {
// });

// app.put('/post/comments/:commentId', (req, res) => {
// });

// app.delete('/post/comments/:commentId', (req, res) => {
// });


// //words

// app.get('/offensiveword', (req, res) => {
// });

// app.post('/offensiveword', (req, res) => {
// });

// app.delete('/offensiveword/:offensiveword', (req, res) => {
// });

// app.put('/offensiveword/:offensiveword', (req, res) => {
// });


// const url = 'mongodb://postmin:postmin@localhost:27018/blogDB?authSource=postmin';

// async function main() {
//     await mongoose.connect(url, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useFindAndModify: false
//     });
//     var customerSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String
//     });
//     var Customer = mongoose.model('Customer', customerSchema);
//     let customer = new Customer({ firstName: 'Jack', lastName: 'Bauer' })
//     await customer.save();
//     conn.close();
//     }
//     main();

// // mongoose.connect('mongodb://postmin:postmin@localhost:27018/blogDB?authSource=postmin', (err, res)=>{
// //     if(err) throw err 
// //     console.log('Conexión a la base de datos establecida ...')
// // })
// app.listen(port, ()=>{
//     console.log(`API REST corriendo en el puerto http://localhost: ${port}`)
// })


var mongoose = require('mongoose');
const express = require('express');

const url = "mongodb://admin:admin@localhost:27018/blogDB?authSource=admin";

const app = express();

app.use(express.json());

let Post;

function toResponse(doc) {
    
    if(doc instanceof Array){
        return doc.map(elem => toResponse(elem));
    } else {
        let ret = doc.toObject({ versionKey: false });
        ret.id = ret._id.toString();
        delete ret._id;
        return ret;
    }    
}

app.post('/post', async (req, res) => {
    const post = req.body;
    if (typeof post.username  != 'string' || typeof post.nickname  != 'string' || typeof title != 'string' ||
    typeof content != 'string') {
        res.sendStatus(400);
    } else {
        
        const newPost = new Post({
            username: post.username ,
            nickname: post.nickname,
            title: post.title,
            text: post.text,
            date: post.date,
            comments: post.comments
            
        });
        
        await newPost.save();

        res.json(toResponse(newPost));
    }
});

app.get('/post', async (req, res) => {
    let allPosts = await Post.find().exec();
    res.json(toResponse(allPosts));
});

app.get('/post/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(toResponse(post));
    }
});

app.delete('/post/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        await Post.findByIdAndDelete(id);
        res.json(toResponse(post));
    }
});

app.put('/post/:id', async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        const postReq = req.body;
        //Validation
        if (typeof postReq.username != 'string' || typeof postReq.nickname  != 'string' || typeof title != 'string' ||
        typeof content != 'string') {
            res.sendStatus(400);
        } else {
            
            //Update fields in model
            post.username = postReq.username; 
            post.nickname = postReq.nickname; 
            post.title = postReq.title; 
            post.text = postReq.text; 
            post.date = postReq.date; 
            post.comments = postReq.comments;
            
            
            //Save
            await post.save();
            
            //Return updated resource
            res.json(toResponse(post));
        }
    }
});

async function dbConnect() {

    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    console.log("Connected to Mongo");

    const postSchema = new mongoose.Schema({
        username: String,
        nickname: String,
        title: String,
        text: String,
        date: { type: Date, default: Date.now },
        //comments: [CommentSchema]
    });

    // const CommentSchema = new Schema({
    //     nickname: String,
    //     username: String,
    //     comment: String,
    //     date: { type: Date, default: Date.now },
        
    // })

    Post = mongoose.model('Post', postSchema);
}

async function main() {

    await dbConnect();

    app.listen(3002, () => console.log('Server started in port 3002'));
}

main();
const express = require("express");
const app = express();
const port = 8080;
//app.listen();
const path = require("path");
const{v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(express.json());
app.use(methodOverride('_method'))

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuidv4(),
        username: "Bhausaheb_Badakh",
        content:"I have selected a web development intern at HustleBee",
    },
    {
        id:uuidv4(),
        username: "Mina_Badakh",
        content:"Hard work is important to get succeed",
    },
    {
        id:uuidv4(),
        username: "Kaveri_Badakh",
        content:"I love coding",
    },
    {
        id:uuidv4(),
        username: "Sujal_Badakh",
        content:"I love singing",
    },
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
})

app.get("/posts/new",(req, res)=> {
    res.render("new.ejs");
   
})

app.post("/posts", (req, res)=>{//after submitting the form with /post/new to add a new post to posts array
    let {username, content} = req.body;//push content taken from form into posts array
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect('/posts')
   //console.log(req.body);
   //res.send("Post requests working")
})

app.get("/posts/:id", (req, res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
})

app.patch("/posts/:id", (req, res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newcontent;
    console.log(post);
    res.redirect("/posts")
})

app.get("/posts/:id/edit", (req, res)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
})

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts")
})

app.listen(port, ()=>{
    console.log(`Listening to the port : ${port}`)
});

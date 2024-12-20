const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id: uuid(),
        username: "shreyas",
        content: "This is my first post"
    },
    {
        id: uuid(),
        username: "Java",
        content: "This is my second post"
    },
    {
        id: uuid(),
        username: "Python",
        content: "This is my third post"
    }
]

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.get('/posts', (req, res) => {
    res.render("index.ejs", { posts });
});

app.get('/posts/new', (req, res) => {
    res.render("new.ejs");
});

app.post('/posts', (req, res) => {
    let { username, content } = req.body;
    let id = uuid();
    posts.push({ id, username, content });
    res.redirect('/posts');
    // res.send("Post added successfully");
});

app.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("show.ejs", { post });
});

app.patch('/posts/:id', (req, res) => {
    const {id}  = req.params;
    let newContent = req.body.content;
    const post = posts.find(p => p.id === id);
    post.content = newContent;
    res.redirect('/posts');
})

app.get('/posts/:id/edit', (req, res) => {
    const { id } = req.params;
    const post = posts.find(p => p.id === id);
    res.render("edit.ejs", { post });
});

app.delete('/posts/:id', (req, res) => { 
    const { id } = req.params;
    posts = posts.filter(p => p.id !== id);
    res.redirect('/posts');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


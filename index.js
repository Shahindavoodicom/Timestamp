const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let users = [];
let exercises = [];
let logs = [];

app.post('/api/users', (req, res) => {
    const { username } = req.body;
    const _id = uuidv4();
    users.push({ username, _id });
    res.json({ username , _id });
});

app.get('/api/users', (req, res) => {
    const usersData = users.map(user => ({_id: user._id , username: user.username, __V : 0}));
    res.json(usersData);
});
app.post('/api/users/:_id/exercises', (req, res) => {
    const { _id } = req.params;
    let description= req.body.description;
    let duration = req.body.duration;
    let date = req.body.date;
    if (!date) {
        date = new Date().toISOString().substring(0, 10);
    }
    const user = users.find((user) => user._id === _id);
    const log = { description, duration: Number(duration), date };
    user.log = user.log || [];
    user.log.push(log);
    res.json({ _id: user._id, username: user.username, date: new Date(date).toDateString(), duration:Number(duration), description:description });
});

app.get('/api/users/:_id/logs', (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const user = users.find((user) => user._id === _id);
    let log = user.log || [];
    log = log.map(exercise => ({...exercise, date: new Date(exercise.date).toDateString()}));
    if (from) {
        const fromDate = new Date(from);
        log = log.filter((exercise) => new Date(exercise.date) >= fromDate);
    }
    if (to) {
        const toDate = new Date(to);
        log = log.filter((exercise) => new Date(exercise.date) <= toDate);
    }
    if (limit) {
        log = log.slice(0, Number(limit));
    }
    const count = log.length;
    res.json({ username: user.username, _id, count, log });
});

app.get('/api/exercises', (req, res) => {
    res.json(exercises);
})

app.get('/api/logs', (req, res) => {
    res.json(logs);
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let users = [];
let exercises = [];
let logs = [];

app.post('/api/users', (req, res) => {
    const { username } = req.body;
    const _id = users.length + 1;
    users.push({ username, _id });
    res.json({ username , _id });
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/users/:_id/exercises', (req, res) => {
    const { _id } = req.params;
    const { description, duration, date = new Date().toISOString() } = req.body;
    const user = users.find((user) => user._id === parseInt(_id));
    const log = { description, duration, date };
    const exercise = { username: user.username, _id, log };
    exercises.push(exercise);
    user.log = user.log || [];
    user.log.push(log);
    res.json(user);
});

app.get('/api/users/:_id/logs', (req, res) => {
    const { _id } = req.params;
    const { from, to, limit } = req.query;
    const user = users.find((user) => user._id === parseInt(_id));
    let log = user.log || [];
    if (from) {
        const fromDate = new Date(from);
        log = log.filter((exercise) => new Date(exercise.date) >= fromDate);
    }
    if (to) {
        const toDate = new Date(to);
        log = log.filter((exercise) => new Date(exercise.date) <= toDate);
    }
    if (limit) {
        log = log.slice(0, limit);
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

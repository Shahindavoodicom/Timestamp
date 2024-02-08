const express = require('express');
const app = express();
const port = 5000;
let cors = require('cors');
app.use(express.json());
app.use(cors());
//Waiting:A request to /api/whoami should return a JSON object with your IP address in the ipaddress key.
// Waiting:A request to /api/whoami should return a JSON object with your preferred language in the language key.
// Waiting:A request to /api/whoami should return a JSON object with your software in the software key.

app.get('/api/whoami', (req, res) => {
    res.json({
        ipaddress: req.ip,
        language: req.headers['accept-language'],
        software: req.headers['user-agent'],
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

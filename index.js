const express = require('express');
const app = express();
const port = 5000;

app.use(express.json());

app.get('/api/:date?', (req, res) => {
    let date = req.params.date;
    if(!isNaN(date)) {
        date = parseInt(date);
    }
    const dateObject = new Date(date);
    if (dateObject.toString() === 'Invalid Date') {
        res.json({ error: 'Invalid Date' });
    }else {
        res.json({ unix: dateObject.getTime(), utc: dateObject.toUTCString() });
    }
}
);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

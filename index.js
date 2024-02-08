const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(express.json());
app.use(cors());
app.get('/api/:date?', (req, res) => {
    let date = req.params.date;
    if(!isNaN(date)) {
        date = parseInt(date);
    }
    if (!date) {
        res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() });
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

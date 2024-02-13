const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
    const { originalname, mimetype, size } = req.file;
    res.json({ name: originalname, type: mimetype, size });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

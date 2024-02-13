const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// You should provide your own project, not the example URL.
// You can submit a form that includes a file upload.
// The form file input field has the name attribute set to upfile.
// When you submit a file, you receive the file name, type, and size in bytes within the JSON response.
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});
app.post('/api/fileanalyse', multer().single('upfile'), (req, res) => {
    const { originalname, mimetype, size } = req.file;
    res.json({ name: originalname, type: mimetype, size });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

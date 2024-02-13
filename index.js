const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Waiting:You can submit a form that includes a file upload.
// Waiting:The form file input field has the name attribute set to upfile.
// Waiting:When you submit a file, you receive the file name, type, and size in bytes within the JSON response.

app.post('/api/fileanalyse', (req, res) => {
    if (req.files) {
        const file = req.files.upfile;
        const name = file.name;
        const type = file.mimetype;
        const size = file.size;
        res.json({ name, type, size });
    } else {
        res.json({ error: 'No file uploaded' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

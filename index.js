const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
//Waiting:You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties. Here's an example: { original_url : 'https://freeCodeCamp.org', short_url : 1}
// Waiting:When you visit /api/shorturl/<short_url>, you will be redirected to the original URL.
// Waiting:If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }

let urlList = [];
let shortUrl = 0;
app.post('/api/shorturl',  (req, res) => {
    const url = req.body.url;
    console.log(url)
  if (!url) {
    res.json({ error: 'No url provided' });
  } else if (url.match(/^(http|https):\/\/[^ "]+$/)) {
    shortUrl++;
    urlList.push({ original_url: url, short_url: shortUrl });
    res.json({ original_url: url, short_url: shortUrl });
  } else {
    res.json({ error: 'invalid url' });
  }
});;

app.get('/api/shorturl/:short_url', (req, res) => {
    const { short_url } = req.params;
    const url = urlList.find((url) => url.short_url === +short_url);
    if (url === undefined) {
        res.json({ error: 'No short URL found for the given input' });
    } else {
        res.redirect(url.original_url);
    }
}
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

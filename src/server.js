const express = require('express');
const app = express();

require('dotenv').config({ path: '.env' });

app.get('/', (req, res) => {
  res.send("Hello world!");
})

app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${server.address().port}`);
  });
const {db} = require('../db');
const express = require('express');
const app = express();

require('dotenv').config({ path: '.env' });

app.get('/', async (req, res) => {
  const querySnapshot = await db.collection('users').get();
  const users = querySnapshot.docs.map(doc => doc.data());
  res.json(users);
});

app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${server.address().port}`);
  });
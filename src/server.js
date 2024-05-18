const {db} = require('../db');
const express = require('express');
const app = express();
const authRoute = require('./routes/authRoute');
const { authMiddleware } = require('./middleware/auth');
require('dotenv').config({ path: '.env' });

app.use(express.json());

app.use('/api/v1', authRoute);

// tes middleware
app.use('/api/v1/user', authMiddleware, (req, res) => {
  res.json({ message: 'login' ,
  user: req.user});
});

app.set('port', process.env.PORT || 8888);
const server = app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${server.address().port}`);
  });
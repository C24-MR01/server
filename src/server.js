const {db} = require('../db');
require('dotenv').config({ path: '.env' });

const express = require('express');
const app = express();

const authRoute = require('./routes/authRoute');
const movieRoute = require('./routes/movieRoute');
const userRoute = require('./routes/userRoute');

const { authMiddleware } = require('./middleware/auth');

app.use(express.json());

app.use('/api/v1', authRoute);
app.use('/api/v1/movie', authMiddleware, movieRoute);

app.use('/api/v1/user', authMiddleware, userRoute);

// tes middleware
// app.use('/api/v1/user', authMiddleware, (req, res) => {
//   res.json({ message: 'login' ,
//   user: req.user});
// });

app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${server.address().port}`);
  });
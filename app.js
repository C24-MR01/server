const {db} = require('./db')
const exprees = require('express');
const app = exprees();

// test
app.get('/', async (req, res) => {
    const querySnapshot = await db.collection('users').get();
    const users = querySnapshot.docs.map(doc => doc.data());
    res.json(users);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
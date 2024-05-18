const {db} = require('../../db');
const User = require('../models/user');

class UserRepository{
    async findByEmail(email){
        // console.log(email);
        const querySnapshot = await db.collection('users').where('email', '==', email).get();
        const user = querySnapshot.docs.map(doc => doc.data());
        return user;
    }

    async create(user){
        const docRef = await db.collection('users').doc(user.id);
        await docRef.set(user);

    }
}

module.exports = new UserRepository();
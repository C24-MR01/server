const {db} = require('../../db');
const User = require('../models/user');
const { FieldValue } = require('firebase-admin/firestore');

class UserRepository{
    async findByEmail(email){
        // console.log(email);
        const querySnapshot = await db.collection('users').where('email', '==', email).get();
        const user = querySnapshot.docs.map(doc => doc.data());
        return user;
    }

    async findbyUsername(username){
        const querySnapshot = await db.collection('users').where('username','==',username).get();
        const user = querySnapshot.docs.map(doc => doc.data());
        return user;
    }

    async finbyUserId(userId){
        const userRef = await db.collection('users').where('id','==',userId).get();
        const user = userRef.docs.map(doc => doc.data());
        return user;
    }

    async create(user){
        const docRef = await db.collection('users').doc(user.id);
        await docRef.set(user);
    }

    async addLike(userId, movieId) {
        const userRef = await db.collection('users').doc(userId);
        await userRef.update({
            likes: FieldValue.arrayUnion(movieId)
        });
    }

    async removeLike(userId, movieId) {
        const userRef = await db.collection('users').doc(userId);
        await userRef.update({
            likes: FieldValue.arrayRemove(movieId)
        });
    }


    async addFriend(currentUserId, userId){
        const userRef = await db.collection('users').doc(currentUserId);
        await userRef.update({
            following: FieldValue.arrayUnion(userId)
        });
    }

    async removeFriend(currentUserId, userId){
        const userRef = await db.collection('users').doc(currentUserId);
        await userRef.update({
            following: FieldValue.arrayRemove(userId)
        });
    }
}

module.exports = new UserRepository();
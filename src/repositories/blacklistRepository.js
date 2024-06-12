const {db} = require('../../db')

class BlacklistRepository{
    async create(token){
        const docRef = await db.collection('blacklist').doc(token);
        await docRef.set({token});
    }

    async findToken(token){
        const docref = await db.collection('blacklist').doc(token).get();
        return docref.exists;
    }
}

module.exports = new BlacklistRepository();
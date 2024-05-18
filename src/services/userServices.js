const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository')
const { nanoid } = require('nanoid');   

require('dotenv').config({ path: '.env' });

class UserService{
    async register(email, password){
        const user = await userRepository.findByEmail(email);
        if(user.length > 0){
            throw new Error('User already exists');
        }

        const hashedPassword = await bycrpt.hash(password, 10);
        const id = nanoid(10);
        const userToCreate = {
            id,
            email,
            password: hashedPassword,
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        await userRepository.create(userToCreate);
    }

    async login(email, password){
        const user = await userRepository.findByEmail(email);
        if(user.length === 0){
            throw new Error('User not found');
        }
        const isValidPassword = await bycrpt.compare(password, user[0].password);
        if(!isValidPassword){
            throw new Error('Invalid password');
        }
        const token = jwt.sign({email: user[0].email}, process.env.JWT_SECRET, {expiresIn: '15s'});
        console.log(token);
        return token;
    }
}

module.exports = new UserService();
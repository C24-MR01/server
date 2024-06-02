const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository')
const { nanoid } = require('nanoid');   

require('dotenv').config({ path: '.env' });

class UserService{
    async register(username, email, password, name, birth, gender){
        let user = await userRepository.findByEmail(email);
        if(user.length > 0){
            throw new Error('User already exists');
        }

        user = await userRepository.findbyUsername(username);
        if(user.length > 0){
            throw new Error('User has already taken');
        }

        const hashedPassword = await bycrpt.hash(password, 10);
        const id = nanoid(10);
        const userToCreate = {
            id,
            email,
            password: hashedPassword,
            username,
            name,
            birthdate : new Date(birth),
            age:0,
            gender,
            likes: [],
            following: [],
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now())
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
        const token = jwt.sign({email: user[0].email}, process.env.JWT_SECRET, {expiresIn: '2h'});
        console.log(token);
        return token;
    }

    async addFriend(currentUserId, userId){
        userRepository.addFriend(currentUserId, userId);
    }

    async removeFriend(currentUserId, userId){
        userRepository.removeFriend(currentUserId, userId);
    }

    async getUser(userId){
        const user = await userRepository.finbyUserId(userId);
        if(user.length === 0){
            throw new Error('User not found');
        }
        const filteredUser = {
            id: user[0].id,
            username: user[0].username,
            likes: user[0].likes,
            following: user[0].following
        };

        return filteredUser;
    }
}


module.exports = new UserService();
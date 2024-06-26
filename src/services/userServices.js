const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository')
const { nanoid } = require('nanoid');   
const { isValidEmail } = require('../utils/validation');
const { calculateAge } = require('../utils/ageCalculation');
require('dotenv').config({ path: '.env' });

class UserService{
    async register(username, email, password, name, birth, gender){
        if(!isValidEmail(email)){
            throw new Error('Invalid email address');
        }
        let user = await userRepository.findByEmail(email);
        if(user.length > 0){
            throw new Error('Email already exists');
        }

        user = await userRepository.findbyUsername(username);
        if(user.length > 0){
            throw new Error('User has already taken');
        }
        const birthdate = new Date(birth);
        const age = calculateAge(birthdate, new Date(Date.now()));
        const hashedPassword = await bycrpt.hash(password, 10);
        const id = nanoid(10);
        const userToCreate = {
            id,
            email,
            password: hashedPassword,
            username,
            name,
            birthdate,
            age,
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
        const token = jwt.sign({email: user[0].email}, process.env.JWT_SECRET);
        return { userId: user[0].id, token };
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
            name: user[0].name,
            username: user[0].username,
            likes: user[0].likes,
            following: user[0].following,
        };

        return filteredUser;
    }

    async findbyUsername(email) {
        const users = await userRepository.findbyUsername(email);
        const filteredUsers = users.map(user => ({
            id: user.id,
            name: user.name,
            username: user.username,
            likes: user.likes,
            following: user.following,
        }));

        return filteredUsers;

    }
}

module.exports = new UserService();
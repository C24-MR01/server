const UserService = require('../services/userServices');
const blacklistRepository = require('../repositories/blacklistRepository');

const register = async (req, res) => {
    try{
        const {username, email, password, name, birth, gender} = req.body;
        await UserService.register(username, email, password, name, birth, gender);
        res.json({
            status: 201,
            message : "account created"
        });
    }catch(err){
        res.json({
            status: 400, 
            message: err.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const token = await UserService.login(email, password);
        res.json(token);
      } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
const logout = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];

        //add token to blacklist
        await blacklistRepository.create(token);
        res.json({ message: 'Logout success' })
    } catch (error){
        res.json({ message: error.message })
    }
}

const addFriend = async (req, res) => {
    try {
        const user = req.user;
        const { userId } = req.params;
        await UserService.addFriend(user[0].id, userId);
        res.json({ message: 'Friend added successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const removeFriend = async (req, res) => {
    try {
        const user = req.user;
        const {userId} = req.params;
        await UserService.removeFriend(user[0].id, userId);
        res.json({ message: 'Friend removed successfully' })

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const user = await UserService.getUser(userId);
        res.json(user);
        return res.status(200);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

const findUser = async (req, res) => {
    try {
        const { username } = req.query;
        const users = await UserService.findbyUsername(username);
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

module.exports = {register, login, addFriend, removeFriend, getUser, findUser, logout};
const UserService = require('../services/userServices');
const userRepository = require('../repositories/userRepository')


const register = async (req, res) => {
    try{
        const {email, password} = req.body;
        console.log(email, password);
        const user = await UserService.register(email, password);
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
        res.json({ token });
      } catch (error) {
        res.status(400).json({ message: error.message });
    }
}    



module.exports = {register, login};
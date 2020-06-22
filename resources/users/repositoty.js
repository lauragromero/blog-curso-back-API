const User = require('./model');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserRepository = {};

const SECRET_KEY = "SECRET_KEY" ;


UserRepository.getAllUsers = async ()=>{
    try {
        return await User.find({}).select({ __v:0});
    }catch(err) {
        console.log(err);
    }
}

UserRepository.createUser = async (user) => {
       let userLogin = new User({ 
            username: user.username,
            nickname: user.nickname, 
            password: user.password, 
            role: user.role 
        });
        console.log(userLogin, 'GUARDADO')
     return await userLogin.save();
}

UserRepository.find = async (username) =>{
    return await User.findOne({ username }).exec();
}

UserRepository.verifyPassword = async(user, password)=> {
    return await bcrypt.compare(password, user.password);
}

UserRepository.createToken = async(username)=>{
    const token = jwt.sign({  user: username.username, id: username._id, isAdmin: username.isAdmin}, SECRET_KEY);
    return token;
}

module.exports = UserRepository; 

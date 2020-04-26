const User = require('./model');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserRepository = {};

const SECRET_KEY = "SECRET_KEY" ;

UserRepository.createUser = async (user) => {
    let userLogin = await User.findOne({username: user.username});
    
    if(!userLogin){
        userLogin = new User({ 
            username: user.username,
            nickname: user.nickname, 
            password: user.password 
        });
    }else{
        userLogin.password = user.password;
        console.log('usuario resgistrado')
    }
     return await userLogin.save();
}

UserRepository.find = async (username) =>{
    return await User.findOne({ username }).exec();
}

UserRepository.verifyPassword = async(user, password)=> {
    return await bcrypt.compare(password, user.passwordHash);
}

UserRepository.createToken = async(username)=>{
    const token = jwt.sign({ user: username }, SECRET_KEY);
    console.log(token);
    return token;
}

module.exports = UserRepository; 

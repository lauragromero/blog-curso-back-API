const UserRepository = require('../resources/users/repositoty')

const authUser = {}

authUser.verify = async (username, password, done)=>{
console.log(username, password)
    const user = await UserRepository.find(username);
    console.log(user)
    if(!user){
        return done(null, false, { message: 'User not found' });
    }

    if(await UserRepository.verifyPassword(user, password)){
        console.log(user, password)
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}


module.exports = authUser; 
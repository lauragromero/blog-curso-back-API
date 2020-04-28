const UserRepository = require('../resources/users/repositoty')

const authUser = {}

authUser.verify = async (username, password, done)=>{
    const user = await UserRepository.find(username);
    if(!user){
        return await done(null, false, { message: 'User not found' });
    }

    if(await UserRepository.verifyPassword(user, password)){
        return await done(null, user);
    } else {
        return await done(null, false, { message: 'Incorrect password' });
    }
}


module.exports = authUser; 
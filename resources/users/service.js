const UserRepository = require('./repositoty');

const UserService = {}; 

UserService.createUser = async (user) => {
    try {
        return await UserRepository.createUser(user);
    } catch (err) {
        console.log(err);
    }

}
UserService.find = async (user) => {
    try {
        return await UserRepository.find(user);
    } catch (err) {
        console.log(err);
    }

}

// UserService.verifyPassword = async (user, password) => {
//     try {
//         return await UserRepository.verifyPassword(user, password);
//     } catch (err) {
//         console.log(err);
//     }

// }

UserService.createToken = async (user) => {
    try {
        return await UserRepository.createToken(user);
    } catch (err) {
        console.log(err);
    }

}

module.exports = UserService; 
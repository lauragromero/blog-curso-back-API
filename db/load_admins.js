const  UserRepository = require('../resources/users/repositoty');

const loadAdmin = async () => {
    try {
        const allUsers = await UserRepository.getAllUsers();
        if (allUsers.length === 0) {
         UserRepository.createUser({username: 'laura', nickname: 'lau',password: '1234', role: 'admin'})
         UserRepository.createUser({username: 'lara', nickname: 'larira',password: '123456', role: 'admin'})
         UserRepository.createUser({username: 'margarita', nickname: 'floramapola',password: '4321', role: 'admin'})
         console.log('Default admin users have been inserted');
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = loadAdmin; 

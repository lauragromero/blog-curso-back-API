const UserRepository = require('../resources/users/repositoty')

async function chekTokenVerify(payload, done) {
    const user = await UserRepository.find(payload.user);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
};


module.exports = chekTokenVerify; 
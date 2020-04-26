const UserRepository = require('../resources/users/repositoty')

async function chekTokenVerify(payload, done) {
    console.log("payload", payload);
    const user = await UserRepository.find(payload.user);
    console.log("jwt", payload, user);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
};


module.exports = chekTokenVerify; 
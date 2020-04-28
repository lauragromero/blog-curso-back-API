const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: 'String'},
    nickname: {type: 'String'},
    password: {type: 'String'},
    role:{ type: 'String', default: 'publisher', enum: ["publisher", "admin"]}, 
    date: {type: Date, default: Date.now}
}); 

UserSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  });
  
UserSchema.methods.isValidPassword = async function(password){
  const user = this;
  const compare = await bcrypt.compare(password, user.password);
  return compare;
}


module.exports = mongoose.model('user', UserSchema);
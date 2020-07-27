const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/express-auth', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});

const UserSchema = new mongoose.Schema({
    // unique 指定唯一值
    username: { type: String, unique: true }, 
    password: { 
        type: String, 
        set(val){// 做写入前操作, 使用bcrypt散列，10级的加密，数字越大加密效果越好效率越低
        return require('bcrypt').hashSync(val, 10);
    }},
});
const User = mongoose.model('user', UserSchema);
// 有时候需要重置表
// User.db.dropCollection('users');
module.exports = { User };
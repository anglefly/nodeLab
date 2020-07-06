const { User } = require('./db');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const secret = 'xiajibaxie'

// 允许接收json数据，这样拿出的body中就含有转化过来的json字符串
app.use(express.json());

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

const auth = async (req, res, next) => {
    if (!req.headers.authorization) return res.status(401).send({
        massage: '请登录'
    });
    try {
        const { id } = jwt.verify(req.headers.authorization.split(' ').pop(), secret)
        req.user = await User.findById(id);
        if (!req.user) return res.status(422).send({
            massage: '用户不存在'
        });
        next()
    } catch (error) {
        return res.status(422).send({
            massage: '用户不存在'
        });
    }
}

app.get('/api/orders', auth, async (req, res) => {
    res.send(req.user);
});

app.post('/api/register', async (req, res) => {
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
    });
    res.send(user);
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
    });
    if (!user) return res.status(422).send({
        massage: '用户不存在',
    });
    // 比较密码是否正确
    const isPasswordValid = require('bcrypt').compareSync(
        req.body.password, user.password
    );
    const token = jwt.sign({
        id: user._id
    }, secret)
    return isPasswordValid ? res.send({
        massage: '登录成功',
        username: user.username,
        token,
    }) : res.send({
        massage: '密码错误',
    });
});

app.listen(3001, () => {
    console.log('http://localhost:3001');
});
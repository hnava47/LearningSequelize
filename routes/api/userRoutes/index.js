const router = require('express').Router();
const User = require('../../../models/User');

router.post('/', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({error: 'You must provide username, password, and email'});
    }

    try {
        const newUser = await User.create({
            username,
            email,
            password
        });
        res.json(newUser);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

module.exports = router;

const router = require('express').Router();
const bcrypt = require('bcryptjs');
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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword
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

router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        res.json(user);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.patch('/:userId', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;

    try {
        await User.update(
            {
                username,
                email,
                password
            },
            {
                where: {
                    id: req.params.userId
                }
            }
        );
        const updatedUser = await User.findByPk(req.params.userId);
        res.json(updatedUser);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByPk(req.params.userId);
        await User.destroy({
            where: {
                id: req.params.userId
            }
        });
        res.json(deletedUser);
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

// For logging in a user to our app
router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(401).json({error: 'You must provide a valid email and password'});
    }

    try {
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (!user) {
            return res.status(400).json({error: 'No user with that email'});
        }

        const isMatchingPassword = await bcrypt.compare(password, user.password);

        if (!isMatchingPassword) {
            return res.status(401).json({error: 'Invalid password'});
        }

        res.json({message: 'You are now logged in successfully'});
    } catch (e) {
        console.log(e);
        res.json(e);
    }
});

module.exports = router;

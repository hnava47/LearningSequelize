const router = require('express').Router();
const Book = require('../../../models/Book');

// Every route declared in this index.js
// will have /api/books prepend automatically
router.post('/', async (req, res) => {
    const {title, author} = req.body;
    try {
        const newBook = await Book.create({
            title,
            author,
            isPaperBack: true
        });

        res.json(newBook);
    } catch (e) {
        console.log('L:12', e);
        res.json(e);
    }
});

// /api/books/seed
router.post('/seed', async (req, res) => {
    const booksToSave = [
        {
            title: 'Data Structures and Algorithms in JavaScript',
            author: 'Lorrraine Granger',
            isbn: '1',
            pages: 100,
            edition: 1,
            isPaperBack: true
        },
        {
            title: 'You Dont Know JS',
            author: 'Kyle Simpson',
            isbn: '2',
            pages: 100,
            edition: 1,
            isPaperBack: true
        },
        {
            title: 'NFT for idiots',
            author: 'Ricky Rice',
            isbn: '3',
            pages: 100,
            edition: 1,
            isPaperBack: true
        },
        {
            title: 'The Outsiders',
            author: 'S.E Hinton',
            isbn: '4',
            pages: 100,
            edition: 1,
            isPaperBack: true
        },
        {
            title: 'The Catcher in the Rye',
            author: 'J.D Salinger',
            isbn: '5',
            pages: 100,
            edition: 1,
            isPaperBack: true
        }
    ]

    try {
        const result = await Book.bulkCreate(booksToSave);
        res.json(result);
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;

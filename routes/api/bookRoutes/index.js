const router = require('express').Router();
const Book = require('../../../models/Book');

// Every route declared in this index.js
// will have /api/books prepend automatically
router.get('/', async (req, res) => {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (e) {
        res.json(e);
    }
});

router.get('/:bookId', async (req, res) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        res.json(book);
    } catch (e) {
        res.json(e);
    }
});

router.patch('/:bookId', async (req, res) => {
    const {
        title,
        author,
        isbn,
        pages,
        edition,
        isPaperBack
    } = req.body;

    try {
        // Update takes 2 parameters
        // the 1st is an object for what columns you want to update
        // and what you want to update them to
        // the 2nd one is an object for which rows do you want to update
        // Updated only gives back the number of records updated. To get the json records, use findByPk()
        await Book.update(
            {
                title,
                author,
                isbn,
                pages,
                edition,
                isPaperBack
            },
            {
                where: {
                    id: req.params.bookId
                }
            }
        );
        const updatedBook = await Book.findByPk(req.params.bookId)
        res.json(updatedBook);
    } catch (e) {
        res.json(e);
    }
});

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

// DELETE route
router.delete('/:bookId', async (req, res) => {
    try {
        const deletedBook = await Book.findByPk(req.params.bookId);
        await Book.destroy({
            where: {
                id: req.params.bookId
            }
        });
        res.json(deletedBook);
    } catch (e) {
        res.json(e);
    }
});

module.exports = router;

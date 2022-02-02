const router = require('express').Router();
const bookRoutes = require('./bookRoutes');
const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');

// Every route inside of this index.js
// already has /api prepended to every route we declare

// This will prepend /api/books to every route declared below this comment
router.use('/books', bookRoutes);

// This will prepend /api/users to every route declared below this comment
router.use('/users', userRoutes);

// This will prepend /api/todos to every route declared below this comment
router.use('/todos', todoRoutes);

module.exports = router;

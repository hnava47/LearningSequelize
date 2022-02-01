const express = require('express');
const sequelize = require('./config');

const Book = require('./models/Book');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connect to the database prior to starting our server
// {force: true} > Force the database to drop/recreate the table
// whenever we start/restart our server (NEVER DO IN PROD)
sequelize.sync({force: true}).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
});

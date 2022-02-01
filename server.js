const express = require('express');
const sequelize = require('./config');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// connect to the database prior to starting our server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server listenting on port: ${PORT}`));
});

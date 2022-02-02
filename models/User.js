const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config');

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'user'
    }
);

module.exports = User;

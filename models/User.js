const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config');

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlphanumeric: true
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
                len: [8]
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'user'
    }
);

module.exports = User;

const {UUIDV4, Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelize = require('../config');

class User extends Model {
    // instance method that belongs to an instance or 1 user object from our DATABASE
    hasPets() {
        if (this.numberOfPets > 0) {
            return true;
        } else {
            return false;
        }
    }
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue:UUIDV4,
            primaryKey: true
        },
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
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8]
            }
        },
        numberOfPets: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: 'user',
        hooks: {
            beforeCreate: async (user, options) => {
                console.log(options);
                console.log(user);
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(user.password, salt);
                user.email = user.email.toLowerCase();
                user.password = hashedPassword;
                return user;
            },
            beforeUpdate: async (user, options) => {
                console.log(options);
                console.log(user.password);
                user.email = user.email.toLowerCase();
                return user;
            }
        }
    }
);

module.exports = User;

const {UUIDV4, Model, DataTypes} = require('sequelize');
const sequelize = require('../config');

class Todo extends Model {}

Todo.init (
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true
        },
        task: {
            type: DataTypes.STRING,
            allowNull: false
        },
         completed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        authorId: {
            type: DataTypes.UUID,
            references: {
                model: 'Users',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        modelName: 'Todo'
    }
);

module.exports = Todo;

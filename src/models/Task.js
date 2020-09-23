const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {}
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            descripton: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE(),
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE(),
                allowNull: false,
            },
        },
        {
            name: 'Task',
            sequelize,
            freezeTableName: true,
            tableName: 'tasks',
        },
    );
    return Task;
};

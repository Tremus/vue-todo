'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tasks', {
            id: {
                type: Sequelize.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            descripton: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: true,
            },
            completed: {
                type: Sequelize.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            createdAt: {
                type: Sequelize.DataTypes.DATE(),
                allowNull: false,
            },
            updatedAt: {
                type: Sequelize.DataTypes.DATE(),
                allowNull: false,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tasks');
    },
};

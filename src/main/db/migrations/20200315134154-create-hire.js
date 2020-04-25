'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('hires', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4
            },
            user_id: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                references: {
                    model: 'users',
                    key: 'account_id'
                }
            },
            car_id: {
                allowNull: false,
                type: Sequelize.UUID,
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                references: {
                    model: 'cars',
                    key: 'id'
                }
            },
            from: {
                type: Sequelize.DATE,
                allowNull: false
            },
            to: {
                type: Sequelize.DATE,
                allowNull: false
            },
            purpose: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            location: {
                type: Sequelize.STRING,
                allowNull: false
            },
            status: {
                type: Sequelize.INTEGER,
                defaultValue: 1,
                allowNull: false
            },
            payment_id: {
                type: Sequelize.UUID,
                allowNull: true,
                onDelete: 'RESTRICT',
                onUpdate: 'RESTRICT',
                references: {
                    model: 'payments',
                    key: 'id'
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('hires');
    }
};

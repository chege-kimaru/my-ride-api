'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('car_features', {
      car_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        references: {
          model: 'cars',
          key: 'id'
        }
      },
      fuel_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      interior_type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      colour: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      engine: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT
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
    return queryInterface.dropTable('car_features');
  }
};

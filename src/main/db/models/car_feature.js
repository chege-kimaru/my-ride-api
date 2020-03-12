'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarFeature = sequelize.define('CarFeature', {
    car_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'cars',
        key: 'id'
      }
    },
    fuel_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    interior_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colour: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    engine: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT
    },
  }, {
    underscored: true,
  });
  CarFeature.associate = function(models) {
    // associations can be defined here
    CarFeature.belongsTo(models.Car, {
      foreignKey: 'car_id'
    })
  };
  return CarFeature;
};

'use strict';
module.exports = (sequelize, DataTypes) => {
  const CarPicture = sequelize.define('CarPicture', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    car_id: {
      allowNull: false,
      type: DataTypes.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'cars',
        key: 'id'
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull:false
    },
    part: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    underscored: true,
  });
  CarPicture.associate = function(models) {
    // associations can be defined here
    CarPicture.belongsTo(models.Car, {
      foreignKey: 'car_id'
    })
  };
  return CarPicture;
};

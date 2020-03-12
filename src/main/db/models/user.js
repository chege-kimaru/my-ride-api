'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    account_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'accounts',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    underscored: true,
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Account, {
      foreignKey: 'account_id'
    });
    User.hasMany(models.Car, {
      foreignKey: 'user_id'
    });
  };
  return User;
};

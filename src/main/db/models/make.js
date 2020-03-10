'use strict';
module.exports = (sequelize, DataTypes) => {
  const Make = sequelize.define('Make', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    make: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    underscored: true,
  });
  Make.associate = function(models) {
    // associations can be defined here
  };
  return Make;
};

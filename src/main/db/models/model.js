'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('Model', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false
    },
    make_id: {
      type: DataTypes.INTEGER,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'makes',
        key: 'id'
      }
    }
  }, {
    underscored: true,
  });
  Model.associate = function(models) {
    // associations can be defined here
  };
  return Model;
};

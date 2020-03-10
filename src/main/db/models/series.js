'use strict';
module.exports = (sequelize, DataTypes) => {
  const Series = sequelize.define('Series', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    series: {
      type: DataTypes.STRING,
      allowNull: false
    },
    model_id: {
      type: DataTypes.INTEGER,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
      references: {
        model: 'models',
        key: 'id'
      }
    }
  }, {
    underscored: true,
  });
  Series.associate = function(models) {
    // associations can be defined here
  };
  return Series;
};

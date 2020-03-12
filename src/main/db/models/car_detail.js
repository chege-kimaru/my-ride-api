'use strict';
module.exports = (sequelize, DataTypes) => {
    const CarDetail = sequelize.define('CarDetail', {
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
        make_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            references: {
                model: 'makes',
                key: 'id'
            }
        },
        model_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            references: {
                model: 'models,',
                key: 'id'
            }
        },
        series_id: {
            type: DataTypes.INTEGER,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            references: {
                model: 'series',
                key: 'id'
            }
        },
        year: {
            type: DataTypes.INTEGER
        },
        mileage: {
            type: DataTypes.INTEGER
        },
        body_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        condition_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        transmission_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        underscored: true,
    });
    CarDetail.associate = function (models) {
        // associations can be defined here
        CarDetail.belongsTo(models.Car, {
            foreignKey: 'car_id'
        });

        CarDetail.belongsTo(models.Make, {
            foreignKey: 'make_id'
        });
        CarDetail.belongsTo(models.Model, {
            foreignKey: 'model_id'
        });
        CarDetail.belongsTo(models.Series, {
            foreignKey: 'series_id'
        });
    };
    return CarDetail;
};

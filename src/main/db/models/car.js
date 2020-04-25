'use strict';
module.exports = (sequelize, DataTypes) => {
    const Car = sequelize.define('Car', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            references: {
                model: 'users',
                key: 'account_id'
            }
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        terms: {
            type: DataTypes.TEXT
        },
    }, {
        underscored: true,
    });
    Car.associate = function (models) {
        // associations can be defined here
        Car.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Car.hasOne(models.CarDetail, {
            foreignKey: 'car_id'
        });
        Car.hasOne(models.CarFeature, {
            foreignKey: 'car_id'
        });
        Car.hasMany(models.CarPicture, {
            foreignKey: 'car_id'
        });
        Car.hasMany(models.Hire, {
            foreignKey: 'car_id'
        })
    };
    return Car;
};

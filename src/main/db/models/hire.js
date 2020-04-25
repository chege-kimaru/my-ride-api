'use strict';
module.exports = (sequelize, DataTypes) => {
    const Hire = sequelize.define('Hire', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        user_id: {
            allowNull: false,
            type: DataTypes.UUID,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            references: {
                model: 'users',
                key: 'id'
            }
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
        from: {
            type: DataTypes.DATE,
            allowNull: false
        },
        to: {
            type: DataTypes.DATE,
            allowNull: false
        },
        purpose: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false
        },
        payment_id: {
            type: DataTypes.UUID,
            allowNull: true,
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
            references: {
                model: 'payments',
                key: 'id'
            }
        },
    }, {
        underscored: true,
    });
    Hire.associate = function (models) {
        // associations can be defined here
        Hire.belongsTo(models.Car, {
            foreignKey: 'car_id'
        });
        Hire.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        Hire.hasOne(models.Payment, {
            foreignKey: 'payment_id'
        })
    };
    return Hire;
};

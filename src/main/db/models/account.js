'use strict';
module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        underscored: true,
        // defaultScope: {
        //     attributes: {exclude: ['password']}
        // }
    });
    Account.associate = function (models) {
        // associations can be defined here
        Account.hasOne(models.User, {
            foreignKey: 'account_id'
        })
    };
    return Account;
};

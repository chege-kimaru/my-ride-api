'use strict';
module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        txref: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
    }, {
        underscored: true,
    });
    Payment.associate = function (models) {
        // associations can be defined here
    };
    return Payment;
};

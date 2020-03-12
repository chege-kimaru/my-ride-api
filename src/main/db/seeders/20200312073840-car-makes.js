'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.queryInterface.bulkInsert('makes', [
                {make: 'Toyota'},
                {make: 'Nissan'},
                {make: 'Subaru'},
                {make: 'Honda'},
            ], {transaction});
            await queryInterface.queryInterface.bulkInsert('models', [
                {make: 'Corolla', make_id: 1},
                {make: 'Premio', make_id: 1},
                {make: 'Mark X', make_id: 1},
                {make: 'Noah', make_id: 1},
            ], {transaction});
            await queryInterface.queryInterface.bulkInsert('series', [
                {make: '1.3', model_id: 1},
                {make: '1.3 Automatic', model_id: 1},
                {make: '1.3 CD', model_id: 1},
            ], {transaction});
            await transaction.commit();
        } catch (err) {
            await transaction.rollback();
            throw err;
        }
    },
    async down(queryInterface, Sequelize) {
        // const transaction = await queryInterface.sequelize.transaction();
        // try {
        //   await queryInterface.removeColumn('Person', 'petName', { transaction });
        //   await transaction.commit();
        // } catch (err) {
        //   await transaction.rollback();
        //   throw err;
        // }
    }
};

var Sequelize = require('sequelize');
var { getEnv } = require('../../util/env');

const host = getEnv('PG_HOST', 'localhost')
const port = getEnv('PG_PORT', '5432')
const user = getEnv('PG_USER', 'postgres')
const pass = getEnv('PG_PASS', '123456')
const dbName = getEnv('PG_DBNAME', 'app')

var sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${dbName}`, {
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        freezeTableName: false,

        // don't use camelcase for automatically added attributes but underscore style
        // so updatedAt will be updated_at
        underscored: true,

        // don't delete database entries but set the newly added attribute deletedAt
        // to the current date (when deletion was done). paranoid will only work if
        // timestamps are enabled
        paranoid: true,
    },
});

module.exports = sequelize
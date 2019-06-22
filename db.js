const Sequelize = require('sequelize');

const db = new Sequelize('orders', 'coolsites', '13052013', {
  host: 'localhost',
  dialect: 'postgres'
});

const Order = db.define('order', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },

    city: {
        type: Sequelize.STRING,
        allowNull: true
    },

    contact: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descript: {
        type: Sequelize.TEXT,
        allowNull: false
    },

    read: {
        allowNull: false,
        type: Sequelize.BOOLEAN
    },

    ip: {
        allowNull: false,
        type: Sequelize.STRING
    }
}, {});

const Visit = db.define('visit', {
    ip: Sequelize.STRING(20)
})

db.sync({force: true}).then(res => {console.log('база данных синхронизированна')})

module.exports = {
    db,
    Order,
    Visit
}
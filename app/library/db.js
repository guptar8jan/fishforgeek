var Sequelize = require("sequelize");
var sequelize = new Sequelize('fishforgeek', 'postgres', 'postgres', {
  host: 'xede-unittest-psql-host',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

var User = sequelize.define('users', {
  firstName: {
    type: Sequelize.TEXT,
    allowNull: false
    //field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.TEXT,
    allowNull: false
    //field: 'last_name'
  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  authId: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  authProvider: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  createDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  updateDate: {
    type: Sequelize.DATE,
    allowNull: true
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

//User.sync({force: true});

module.exports = {
	User: User,
	sequelize: sequelize
};
var Sequelize = require("sequelize");
console.log(Sequelize);
var sequelize = new Sequelize('fishforgeek', 'postgres', 'postgres', {
  host: 'xede-unittest-psql-host',
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
    field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  lastName: {
    type: Sequelize.STRING,
    field: 'last_name'
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});

User.sync({force: true}).then(function () {
  // Table created
  return User.create({
    firstName: 'John',
    lastName: 'Hancock'
  });
});

module.exports = {
	User: User,
	sequelize: sequelize
};
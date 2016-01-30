module.exports = function(sequelize, DataTypes) {
    var users = sequelize.define('users', {
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isAlpha: true
        }
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      authId: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      authProvider: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          isIn: ['facebook']
        }
      }
    }, {
      freezeTableName: true // Model tableName will be the same as the model name
    });
  return users;
}
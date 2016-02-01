'use strict';

import os from 'os';

//loads the proper configuration from the environmental configuration files
//reference this file within code to get the correct env settings
//put config settings in ALL of the environment config files
//DO NOT PUT ENVIRONMENTAL SETTINGS DIRECTLY IN THIS FILE
var env = process.env.NODE_ENV || os.hostname();
var configFile = './' + env + '.js';

try {
    var envConfig = require(configFile);
}
catch (exception){
    if(exception.code === 'MODULE_NOT_FOUND'){
        console.log('no config found for', env, ' falling back to development config');
        env = process.env.NODE_ENV || 'development';
        var configFile = './' + env + '.js';
        var envConfig = require(configFile);
    } else {
        throw exception;
    }
}
console.log('loaded configuration for ' + env + ' from ' + configFile);

module.exports = envConfig;
module.exports.env = env;

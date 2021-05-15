'use strict';

var fs = require('fs');
var configFile = '../settings/config.json';

class ConfigService {

    constructor() {}

    get tag() {
        return 'ConfigService';
    }

    get config() {
        return JSON.parse(fs.readFileSync(configFile));
    }

}

var configService;
module.exports = () => {
    if(!configService) configService = new ConfigService();
    return configService;
}
const uniqid = require('uniqid');

class IdService {

    constructor() {

    }

    generate(prefix) {
        return uniqid.time(prefix) + '-' + uniqid.time() + '-' + uniqid.time();
    }

    generate12Byte(prefix) {
        return uniqid.process(prefix) + '-' + uniqid.process() + '-' + uniqid.process();
    }

    generate16Byte(prefix) {
        return uniqid(prefix) + '-' + uniqid() + '-' + uniqid();
    }

}

module.exports = new IdService()
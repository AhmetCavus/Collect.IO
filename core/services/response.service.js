class ResponseService {

    constructor() {
        console.log("Response service is created")
    }

    createSuccess(successKey, successValue) {
        var res = {};
        res[successKey] = successValue;
        res.success = true;
        return res;
    }

    createFail(errorKey, errorValue) {
        var res = {};
        res[errorKey] = errorValue;
        res.success = false;
        return res;
    }

}

module.exports = new ResponseService()

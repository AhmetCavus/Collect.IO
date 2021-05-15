class ResponseService {

    constructor() {

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

var responseService;
module.exports = () => {
    if (!responseService) responseService = new ResponseService();
    return responseService;
}
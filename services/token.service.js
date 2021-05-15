const jwt = require('jsonwebtoken');
const _verifyHeader = Symbol('verifyHeader');

class TokenService {

    constructor() {

    }

    verifyToken(token, callback) {
        jwt.verify(token, process.env.JWT_SECRET, [process.env.HASH_ALGORITHM], callback);
    }

    signToken(object, callback) {
        jwt.sign(
            object,
            process.env.JWT_SECRET,
            { algorithm: process.env.HASH_ALGORITHM },
            callback
        );
    }

    signToken(object) {
        return jwt.sign(object, process.env.JWT_SECRET, { algorithm: process.env.HASH_ALGORITHM });
    }

    verifyBaseHeader(req, res, next, success, fail) {
        this[_verifyHeader](req, res, next,
            decoded => {
                if (decoded.clientId === process.env.CLIENT_ID
                    && decoded.secretId === process.env.SECRET_ID) {
                    success(decoded, req, res, next);
                } else {
                    fail(err, req, res, next);
                }
            },
            fail
        );
    }

    verifyIdentityHeader(req, res, next, success, fail) {
        this[_verifyHeader](req, res, next,
            decoded => {
                success(decoded, req, res, next);
            },
            fail
        );
    }

    [_verifyHeader](req, res, next, success, fail) {
        if (req.headers.authorization) {
            this.verifyToken(req.headers.authorization, (err, decoded) => {
                if (err) {
                    fail(err, req, res, next);
                } else {
                    success(decoded);
                }
            });
        } else {
            fail(createFail('Missing or bad authentification'), req, res, next);
        }
    }

    createToken(profile) {
        // we are sending the profile in the token
        var token = jwt.sign({ profile: profile }, secure.config.jwtSecret, { expiresIn: 60 * 60 * 24 });
        return token;
    }

    createFail(message) {
        return {
            success: false,
            error: message
        }
    }

}

var tokenService;
module.exports = () => {
    if (!tokenService) tokenService = new TokenService();
    return tokenService;
}
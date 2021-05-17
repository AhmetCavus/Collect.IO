const bodyParser = require('body-parser');
const path = require('path');
var hbs = require('hbs');
const morgan = require('morgan');
const compression = require("compression")
const helmet = require("helmet")
const cors = require("./../middleware/cors")

class AppConfigurator {

    constructor(app, express) {
        this._app = app;
        this._express = express;
    }

    init() {
        this._app.use(bodyParser.json({extended: false})); // support json encoded bodies
        this._app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
        this._app.use(cors); // support encoded bodies
        this._app.use(helmet())
        this._app.use(compression())
        this._app.use(morgan('combined'));
        this._app.set('view engine', 'html');
        this._app.engine('html', hbs.__express);
        this._app.set('views', path.join(__dirname + '/root/', 'views'));
        this._app.use(this._express.static('public'));
        this._app.use('/image', this._express.static('public/storage/assets/images'));
    }

}

module.exports = (app, express) => new AppConfigurator(app, express)

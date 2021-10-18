"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publicPath = void 0;

var _express = _interopRequireWildcard(require("express"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _expressHandlebars = _interopRequireDefault(require("express-handlebars"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var http = _interopRequireWildcard(require("http"));

var _config = _interopRequireDefault(require("./config"));

var _routerProduct = _interopRequireDefault(require("./routes/routerProduct"));

var _routerLogin = _interopRequireDefault(require("./routes/routerLogin"));

var _mensajesDB = require("./models/mensajesDB");

var _sockets = require("./api/sockets");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var advancedOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
var app = (0, _express["default"])();
var puerto = 8080;
var server = http.Server(app);

_mensajesDB.dbConnection.init();

(0, _sockets.initWSServer)(server);
server.listen(puerto, function () {
  return console.log('Server up en puerto', puerto);
});
server.on('error', function (err) {
  console.log('ERROR ATAJADO', err);
});

var layoutFolderPath = _path["default"].resolve(__dirname, '../views/layouts');

var defaultLayerPath = _path["default"].resolve(__dirname, '../views/layouts/index.hbs');

var partialFolderPath = _path["default"].resolve(__dirname, '../views/partial');

app.set('view engine', 'hbs');
app.engine('hbs', (0, _expressHandlebars["default"])({
  layoutsDir: layoutFolderPath,
  partialsDir: partialFolderPath,
  defaultLayout: defaultLayerPath,
  extname: 'hbs'
}));

var publicPath = _path["default"].resolve(__dirname, '../public');

exports.publicPath = publicPath;
console.log(_config["default"].MONGO_ATLAS_URL);
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: _config["default"].MONGO_ATLAS_URL,
    mongoOptions: advancedOptions,
    dbName: 'sesiones',
    collectionName: 'sesiones',
    ttl: 60
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false
  /* ,
  cookie: {
  maxAge: 40000
  } */

};
app.use((0, _cookieParser["default"])());
app.use(_express["default"]["static"](publicPath));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _expressSession["default"])(StoreOptions));
app.use('/api', _routerProduct["default"]);
app.use('/', _routerLogin["default"]);
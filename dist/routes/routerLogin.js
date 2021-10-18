"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _path = _interopRequireDefault(require("path"));

var _index = require("../index");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();

var routerLogin = _express["default"].Router();

var usuarios = [{
  nombre: 'admin',
  password: '1234'
}];
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use((0, _cookieParser["default"])());
routerLogin.get('/', function (req, res) {
  console.log('esta el usuario?', req.session.nombre);

  if (req.session.nombre) {
    res.redirect('/datos');
  } else {
    res.redirect('/login');
  }
});
/* --------- LOGIN ---------- */

routerLogin.get('/login', function (req, res) {
  res.sendFile(_index.publicPath + '/login.html');
});
routerLogin.post('/login', function (req, res) {
  var _req$body = req.body,
      nombre = _req$body.nombre,
      password = _req$body.password;
  var credencialesOk = usuarios.filter(function (usuario) {
    return usuario.nombre === nombre && usuario.password === password;
  }).length;

  if (credencialesOk) {
    req.session.nombre = nombre;
    req.session.contador = 0;
    res.redirect('/');
    console.log(req.session);
  } else {
    res.render('login-error', {});
  }
});
routerLogin.get('/register', function (req, res) {
  var registerPath = _path["default"].resolve(__dirname, '/index.html');

  res.sendFile(_index.publicPath + registerPath);
});
routerLogin.post('/register', function (req, res) {
  var nombre = req.body.nombre;
  var encontrado = usuarios.filter(function (usuario) {
    return usuario.nombre == nombre;
  }).length;

  if (!encontrado) {
    usuarios.push(req.body);
    req.session.nombre = nombre;
    req.session.contador = 0;
    res.redirect('/');
  } else {
    res.render('register-error', {});
  }
});
routerLogin.get('/datos', function (req, res) {
  if (req.session.nombre) {
    req.session.contador++;
    console.log(req.session.contador);
    res.render('datos', {
      datos: usuarios.find(function (usuario) {
        return usuario.nombre == req.session.nombre;
      }),
      contador: req.session.contador
    });
  } else {
    res.redirect('/login');
  }
});
routerLogin.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});
var _default = routerLogin;
exports["default"] = _default;
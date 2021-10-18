"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dbConnection = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _normalizr = require("normalizr");

var schemaMensaje = new _mongoose["default"].Schema({
  author: {
    mail: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  createdAt: {
    type: String,
    required: true
  },
  mensaje: {
    type: String,
    required: true
  }
});
var URL = 'mmongodb://localhost:27017/ecommerce';
var author = new _normalizr.schema.Entity('author', {}, {
  idAttribute: 'mail'
});
var msg = new _normalizr.schema.Entity('message', {
  author: author
}, {
  idAttribute: 'id_'
});
var msgesSchema = new _normalizr.schema.Array(msg);

var mensajesDB = /*#__PURE__*/function () {
  function mensajesDB() {
    (0, _classCallCheck2["default"])(this, mensajesDB);

    _mongoose["default"].connect(URL);

    this.mensajes = _mongoose["default"].model('mensajes', schemaMensaje);
  }

  (0, _createClass2["default"])(mensajesDB, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log("Inicializo la base");

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.mensajes.find());

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get() {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "create",
    value: function () {
      var _create = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(data) {
        var newMsj;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                newMsj = new this.mensajes(data);
                _context3.next = 3;
                return newMsj.save();

              case 3:
                return _context3.abrupt("return", newMsj);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function create(_x) {
        return _create.apply(this, arguments);
      }

      return create;
    }()
  }]);
  return mensajesDB;
}();

var dbConnection = new mensajesDB();
exports.dbConnection = dbConnection;
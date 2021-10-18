"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _faker = _interopRequireDefault(require("faker"));

var Producto = /*#__PURE__*/function () {
  function Producto() {
    (0, _classCallCheck2["default"])(this, Producto);
    this.productos = [];
    this.dataFake = [];
  }

  (0, _createClass2["default"])(Producto, [{
    key: "readbyid",
    value: function readbyid(id) {
      return this.productos.find(function (producto) {
        return producto.id == id;
      });
    }
  }, {
    key: "update",
    value: function update(dato, id) {
      if (!dato.title || !dato.price || !dato.thumbnail || typeof dato.title != 'string' || //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
      //typeof dato.price != 'number' ||
      typeof dato.thumbnail != 'string') {
        return 'error';
      }

      ;

      if (id < 1 || id > this.productos.length) {
        return 'outOfRange';
      }

      var indice = this.productos.findIndex(function (data) {
        return data.id == id;
      });
      dato['id'] = id;
      var dato2 = {
        id: id,
        title: dato.title,
        price: parseInt(dato.price),
        thumbnail: dato.thumbnail
      }; //console.log(this.productos[indice])

      this.productos[indice] = dato2;
      return this.productos;
    }
  }, {
    key: "savedata",
    value: function savedata(dato) {
      if (!dato.title || !dato.price || !dato.thumbnail || typeof dato.title != 'string' || //utilizar raw desde postman para insertar datos con price 'numbre'. Sino arroja error.
      //typeof dato.price != 'number' ||
      typeof dato.thumbnail != 'string') {
        return 'error';
      }

      ;
      var producto = {
        id: this.productos.length + 1,
        title: dato.title,
        price: parseInt(dato.price),
        thumbnail: dato.thumbnail
      };
      this.productos.push(producto);
      return producto;
    }
  }, {
    key: "readlist",
    value: function readlist() {
      return this.productos;
    }
  }, {
    key: "borrar",
    value: function borrar(id) {
      var indice = this.productos.findIndex(function (data) {
        return data.id == id;
      });

      if (id < 1 || id > this.productos.length) {
        return 'outOfRange';
      }

      console.log(indice);
      this.productos.splice(indice, 1);
      return this.productos;
    }
  }, {
    key: "fakeData",
    value: function fakeData(cant) {
      this.dataFake = [];

      for (var i = 0; i < cant; i++) {
        this.dataFake.push({
          title: _faker["default"].commerce.product(),
          price: _faker["default"].commerce.price(),
          thumbnail: _faker["default"].image.avatar()
        });
      }

      return this.dataFake;
    }
  }]);
  return Producto;
}();

var _default = Producto;
exports["default"] = _default;
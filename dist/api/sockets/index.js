"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initWSServer = void 0;

var _moment = _interopRequireDefault(require("moment"));

var _socket = _interopRequireDefault(require("socket.io"));

var _mensajesDB = require("../../models/mensajesDB");

var guardarNewMessage = function guardarNewMessage(data) {
  var now = new Date();
  var date = (0, _moment["default"])(now).format("DD/MM/YYYY HH:MM:SS");
  var newMessage = {
    author: {
      mail: data.author.mail,
      nombre: data.author.nombre,
      apellido: data.author.apellido,
      alias: data.author.alias,
      edad: data.author.edad,
      url: data.author.url
    },
    createdAt: date,
    mensaje: data.mensaje
  };

  _mensajesDB.dbConnection.create(newMessage);
};

var productos = [];

var initWSServer = function initWSServer(server) {
  var myWSServer = (0, _socket["default"])(server);
  myWSServer.on('connection', function (socket) {
    console.log('\n\nUn cliente se ha conectado');
    console.log("ID DEL SOCKET DEL CLIENTE => ".concat(socket.client.id));
    console.log("ID DEL SOCKET DEL SERVER => ".concat(socket.id));
    socket.on('new-message', function (data) {
      productos.push(data);
      socket.emit('messages', productos);
    });
    socket.on('askData', function () {
      _mensajesDB.dbConnection.get().then(function (chatfile) {
        socket.emit('messages', productos);
        socket.emit('message', chatfile);
      });
    });
    socket.on("chatMessage", function (chat) {
      guardarNewMessage(chat);

      _mensajesDB.dbConnection.get().then(function (chatfile) {
        socket.emit('message', chatfile); // socket.broadcast.emit("message", chatfile);
      });
    });
  });
};

exports.initWSServer = initWSServer;
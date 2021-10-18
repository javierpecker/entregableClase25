"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

console.log(process.env.MONGO_ATLAS_SRV);
var _default = {
  MONGO_ATLAS_URL: process.env.MONGO_ATLAS_SRV || 'db',
  PORT: process.env.PORT || 8080
};
exports["default"] = _default;
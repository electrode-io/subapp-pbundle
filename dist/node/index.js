"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  FrameworkLib: true,
  h: true,
  Component: true,
  render: true,
  AppContext: true,
  reduxBundlerLoadSubApp: true
};
Object.defineProperty(exports, "AppContext", {
  enumerable: true,
  get: function () {
    return _appContext.default;
  }
});
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function () {
    return _preact.Component;
  }
});
Object.defineProperty(exports, "FrameworkLib", {
  enumerable: true,
  get: function () {
    return _feFrameworkLib.default;
  }
});
Object.defineProperty(exports, "h", {
  enumerable: true,
  get: function () {
    return _preact.h;
  }
});
Object.defineProperty(exports, "reduxBundlerLoadSubApp", {
  enumerable: true,
  get: function () {
    return _reduxBundler.reduxBundlerLoadSubApp;
  }
});
Object.defineProperty(exports, "render", {
  enumerable: true,
  get: function () {
    return _preact.render;
  }
});
var _feFrameworkLib = _interopRequireDefault(require("./fe-framework-lib"));
var _subappWeb = require("subapp-web");
Object.keys(_subappWeb).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _subappWeb[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _subappWeb[key];
    }
  });
});
var _preact = require("preact");
var _appContext = _interopRequireDefault(require("./app-context"));
var _reduxBundler = require("./redux-bundler");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _subappWeb.setupFramework)(_feFrameworkLib.default);
//# sourceMappingURL=index.js.map
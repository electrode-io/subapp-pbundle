"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _preact = require("preact");
/** @jsx h */

class FrameworkLib {
  constructor(ref) {
    this.ref = ref;
  }
  renderStart() {
    const {
      subApp,
      element,
      options
    } = this.ref;
    const props = {
      ...options._prepared,
      ...options.props
    };
    const Component = subApp.info.StartComponent || subApp.info.Component;
    if (element) {
      if (options.serverSideRendering) {
        (0, _preact.hydrate)((0, _preact.h)(Component, props), element);
      } else {
        (0, _preact.render)((0, _preact.h)(Component, props), element);
      }
    } else {
      // no DOM element to render into, just return subapp as a component
      return (0, _preact.h)(Component, props);
    }
  }
}
var _default = exports.default = FrameworkLib;
//# sourceMappingURL=fe-framework-lib.js.map
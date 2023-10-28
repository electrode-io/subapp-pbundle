import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
/** @jsx h */
import { h, render, hydrate } from "preact";
var FrameworkLib = /*#__PURE__*/function () {
  function FrameworkLib(ref) {
    _classCallCheck(this, FrameworkLib);
    this.ref = ref;
  }
  _createClass(FrameworkLib, [{
    key: "renderStart",
    value: function renderStart() {
      var _this$ref = this.ref,
        subApp = _this$ref.subApp,
        element = _this$ref.element,
        options = _this$ref.options;
      var props = _objectSpread(_objectSpread({}, options._prepared), options.props);
      var Component = subApp.info.StartComponent || subApp.info.Component;
      if (element) {
        if (options.serverSideRendering) {
          hydrate(h(Component, props), element);
        } else {
          render(h(Component, props), element);
        }
      } else {
        // no DOM element to render into, just return subapp as a component
        return h(Component, props);
      }
    }
  }]);
  return FrameworkLib;
}();
export default FrameworkLib;
//# sourceMappingURL=fe-framework-lib.js.map
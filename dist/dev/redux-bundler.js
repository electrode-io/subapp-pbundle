/** @jsx h */

import { h, render } from "preact";
import { loadSubApp } from "subapp-web";
import { Provider } from "redux-bundler-preact";
import { setStoreContainer, getReduxCreateStore } from "./shared";
setStoreContainer(typeof window === "undefined" ? global : window);

//
// client side function to start a subapp with redux-bundler support
//
export function reduxRenderStart(_ref) {
  var store = _ref.store,
    Component = _ref.Component,
    element = _ref.element;
  var component;
  if (element) {
    render(h(Provider, {
      store: store
    }, h(Component, null)), element);
  } else {
    component = h(Provider, {
      store: store
    }, h(Component, null));
  }
  return {
    store: store,
    component: component
  };
}

//
// Load a subapp with redux-bundler support
// info - the subapp's information
//
export function reduxBundlerLoadSubApp(info) {
  var renderStart = function renderStart(instance, element) {
    var Component = this.info.StartComponent || this.info.Component;
    var _reduxRenderStart = reduxRenderStart({
        store: instance._store,
        Component: Component,
        // serverSideRendering: instance.serverSideRendering,
        element: element
      }),
      component = _reduxRenderStart.component;
    return component;
  };
  var preRender = function preRender(instance) {
    var initialState = instance._prepared || instance.initialState;
    var reduxCreateStore = instance.reduxCreateStore || this.info.reduxCreateStore;
    instance._store = instance._store || reduxCreateStore(initialState);
    return instance;
  };
  var signalReady = function signalReady(instance) {
    var _this = this;
    var store = instance._store;
    if (store.realize) {
      instance._store = store.realize();
    }
    return Promise.resolve().then(function () {
      if (_this.info.reduxStoreReady) {
        return _this.info.reduxStoreReady({
          store: instance._store
        });
      }
    }).then(function () {
      return instance;
    });
  };

  // allow subApp to specify redux bundles as reduxBundles or bundles
  var reduxBundles = info.reduxBundles || info.bundles;
  var extras = {
    reduxBundles: reduxBundles,
    __preRender: preRender,
    __signalReady: signalReady,
    __redux: true
  };
  if (!info.reduxCreateStore) {
    extras._genReduxCreateStore = "subapp";
    extras.reduxCreateStore = getReduxCreateStore(info);
  }
  return loadSubApp(Object.assign(extras, info), renderStart);
}
//# sourceMappingURL=redux-bundler.js.map
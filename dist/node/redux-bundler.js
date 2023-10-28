"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduxBundlerLoadSubApp = reduxBundlerLoadSubApp;
exports.reduxRenderStart = reduxRenderStart;
var _preact = require("preact");
var _subappWeb = require("subapp-web");
var _reduxBundlerPreact = require("redux-bundler-preact");
var _shared = require("./shared");
/** @jsx h */

(0, _shared.setStoreContainer)(typeof window === "undefined" ? global : window);

//
// client side function to start a subapp with redux-bundler support
//
function reduxRenderStart({
  store,
  Component,
  element
}) {
  let component;
  if (element) {
    (0, _preact.render)((0, _preact.h)(_reduxBundlerPreact.Provider, {
      store: store
    }, (0, _preact.h)(Component, null)), element);
  } else {
    component = (0, _preact.h)(_reduxBundlerPreact.Provider, {
      store: store
    }, (0, _preact.h)(Component, null));
  }
  return {
    store,
    component
  };
}

//
// Load a subapp with redux-bundler support
// info - the subapp's information
//
function reduxBundlerLoadSubApp(info) {
  const renderStart = function (instance, element) {
    const Component = this.info.StartComponent || this.info.Component;
    const {
      component
    } = reduxRenderStart({
      store: instance._store,
      Component,
      // serverSideRendering: instance.serverSideRendering,
      element
    });
    return component;
  };
  const preRender = function (instance) {
    const initialState = instance._prepared || instance.initialState;
    const reduxCreateStore = instance.reduxCreateStore || this.info.reduxCreateStore;
    instance._store = instance._store || reduxCreateStore(initialState);
    return instance;
  };
  const signalReady = function (instance) {
    const store = instance._store;
    if (store.realize) {
      instance._store = store.realize();
    }
    return Promise.resolve().then(() => {
      if (this.info.reduxStoreReady) {
        return this.info.reduxStoreReady({
          store: instance._store
        });
      }
    }).then(() => instance);
  };

  // allow subApp to specify redux bundles as reduxBundles or bundles
  const reduxBundles = info.reduxBundles || info.bundles;
  const extras = {
    reduxBundles,
    __preRender: preRender,
    __signalReady: signalReady,
    __redux: true
  };
  if (!info.reduxCreateStore) {
    extras._genReduxCreateStore = "subapp";
    extras.reduxCreateStore = (0, _shared.getReduxCreateStore)(info);
  }
  return (0, _subappWeb.loadSubApp)(Object.assign(extras, info), renderStart);
}
//# sourceMappingURL=redux-bundler.js.map
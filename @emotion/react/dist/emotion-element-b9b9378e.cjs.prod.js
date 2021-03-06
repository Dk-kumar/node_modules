"use strict";

var React = require("react"), createCache = require("@emotion/cache"), _extends = require("@babel/runtime/helpers/extends"), weakMemoize = require("@emotion/weak-memoize"), _isolatedHnrs_dist_emotionReact_isolatedHnrs = require("../_isolated-hnrs/dist/emotion-react-_isolated-hnrs.cjs.prod.js"), utils = require("@emotion/utils"), serialize = require("@emotion/serialize");

function _interopDefault(e) {
  return e && e.__esModule ? e : {
    default: e
  };
}

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  return e && Object.keys(e).forEach((function(k) {
    if ("default" !== k) {
      var d = Object.getOwnPropertyDescriptor(e, k);
      Object.defineProperty(n, k, d.get ? d : {
        enumerable: !0,
        get: function() {
          return e[k];
        }
      });
    }
  })), n.default = e, Object.freeze(n);
}

var React__namespace = _interopNamespace(React), createCache__default = _interopDefault(createCache), _extends__default = _interopDefault(_extends), weakMemoize__default = _interopDefault(weakMemoize), isBrowser = "undefined" != typeof document, hasOwnProperty = {}.hasOwnProperty, EmotionCacheContext = React.createContext("undefined" != typeof HTMLElement ? createCache__default.default({
  key: "css"
}) : null);

var CacheProvider = EmotionCacheContext.Provider, __unsafe_useEmotionCache = function() {
  return React.useContext(EmotionCacheContext);
};

exports.withEmotionCache = function(func) {
  return React.forwardRef((function(props, ref) {
    var cache = React.useContext(EmotionCacheContext);
    return func(props, cache, ref);
  }));
}, isBrowser || (exports.withEmotionCache = function(func) {
  return function(props) {
    var cache = React.useContext(EmotionCacheContext);
    return null === cache ? (cache = createCache__default.default({
      key: "css"
    }), React.createElement(EmotionCacheContext.Provider, {
      value: cache
    }, func(props, cache))) : func(props, cache);
  };
});

var ThemeContext = React.createContext({});

var useTheme = function() {
  return React.useContext(ThemeContext);
}, getTheme = function(outerTheme, theme) {
  if ("function" == typeof theme) {
    var mergedTheme = theme(outerTheme);
    return mergedTheme;
  }
  return _extends__default.default({}, outerTheme, theme);
}, createCacheWithTheme = weakMemoize__default.default((function(outerTheme) {
  return weakMemoize__default.default((function(theme) {
    return getTheme(outerTheme, theme);
  }));
})), ThemeProvider = function(props) {
  var theme = React.useContext(ThemeContext);
  return props.theme !== theme && (theme = createCacheWithTheme(theme)(props.theme)), 
  React.createElement(ThemeContext.Provider, {
    value: theme
  }, props.children);
};

function withTheme(Component) {
  var componentName = Component.displayName || Component.name || "Component", render = function(props, ref) {
    var theme = React.useContext(ThemeContext);
    return React.createElement(Component, _extends__default.default({
      theme: theme,
      ref: ref
    }, props));
  }, WithTheme = React.forwardRef(render);
  return WithTheme.displayName = "WithTheme(" + componentName + ")", _isolatedHnrs_dist_emotionReact_isolatedHnrs.default(WithTheme, Component);
}

var getLastPart = function(functionName) {
  var parts = functionName.split(".");
  return parts[parts.length - 1];
}, getFunctionNameFromStackTraceLine = function(line) {
  var match = /^\s+at\s+([A-Za-z0-9$.]+)\s/.exec(line);
  return match || (match = /^([A-Za-z0-9$.]+)@/.exec(line)) ? getLastPart(match[1]) : void 0;
}, internalReactFunctionNames = new Set([ "renderWithHooks", "processChild", "finishClassComponent", "renderToString" ]), sanitizeIdentifier = function(identifier) {
  return identifier.replace(/\$/g, "-");
}, getLabelFromStackTrace = function(stackTrace) {
  if (stackTrace) for (var lines = stackTrace.split("\n"), i = 0; i < lines.length; i++) {
    var functionName = getFunctionNameFromStackTraceLine(lines[i]);
    if (functionName) {
      if (internalReactFunctionNames.has(functionName)) break;
      if (/^[A-Z]/.test(functionName)) return sanitizeIdentifier(functionName);
    }
  }
}, isBrowser$1 = "undefined" != typeof document, useInsertionEffect = React__namespace.useInsertionEffect ? React__namespace.useInsertionEffect : function(create) {
  create();
};

function useInsertionEffectMaybe(create) {
  if (!isBrowser$1) return create();
  useInsertionEffect(create);
}

var typePropName = "__EMOTION_TYPE_PLEASE_DO_NOT_USE__", labelPropName = "__EMOTION_LABEL_PLEASE_DO_NOT_USE__", createEmotionProps = function(type, props) {
  var newProps = {};
  for (var key in props) hasOwnProperty.call(props, key) && (newProps[key] = props[key]);
  return newProps[typePropName] = type, newProps;
}, Insertion = function(_ref) {
  var cache = _ref.cache, serialized = _ref.serialized, isStringTag = _ref.isStringTag;
  utils.registerStyles(cache, serialized, isStringTag);
  var rules = useInsertionEffectMaybe((function() {
    return utils.insertStyles(cache, serialized, isStringTag);
  }));
  if (!isBrowser && void 0 !== rules) {
    for (var _ref2, serializedNames = serialized.name, next = serialized.next; void 0 !== next; ) serializedNames += " " + next.name, 
    next = next.next;
    return React.createElement("style", ((_ref2 = {})["data-emotion"] = cache.key + " " + serializedNames, 
    _ref2.dangerouslySetInnerHTML = {
      __html: rules
    }, _ref2.nonce = cache.sheet.nonce, _ref2));
  }
  return null;
}, Emotion = exports.withEmotionCache((function(props, cache, ref) {
  var cssProp = props.css;
  "string" == typeof cssProp && void 0 !== cache.registered[cssProp] && (cssProp = cache.registered[cssProp]);
  var WrappedComponent = props[typePropName], registeredStyles = [ cssProp ], className = "";
  "string" == typeof props.className ? className = utils.getRegisteredStyles(cache.registered, registeredStyles, props.className) : null != props.className && (className = props.className + " ");
  var serialized = serialize.serializeStyles(registeredStyles, void 0, React.useContext(ThemeContext));
  className += cache.key + "-" + serialized.name;
  var newProps = {};
  for (var key in props) hasOwnProperty.call(props, key) && "css" !== key && key !== typePropName && (newProps[key] = props[key]);
  return newProps.ref = ref, newProps.className = className, React.createElement(React.Fragment, null, React.createElement(Insertion, {
    cache: cache,
    serialized: serialized,
    isStringTag: "string" == typeof WrappedComponent
  }), React.createElement(WrappedComponent, newProps));
}));

exports.CacheProvider = CacheProvider, exports.Emotion = Emotion, exports.ThemeContext = ThemeContext, 
exports.ThemeProvider = ThemeProvider, exports.__unsafe_useEmotionCache = __unsafe_useEmotionCache, 
exports.createEmotionProps = createEmotionProps, exports.hasOwnProperty = hasOwnProperty, 
exports.isBrowser = isBrowser, exports.useInsertionEffectMaybe = useInsertionEffectMaybe, 
exports.useTheme = useTheme, exports.withTheme = withTheme;

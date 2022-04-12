"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "badgeUnstyledClasses", {
  enumerable: true,
  get: function () {
    return _badgeUnstyledClasses.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _BadgeUnstyled.default;
  }
});
Object.defineProperty(exports, "getBadgeUtilityClass", {
  enumerable: true,
  get: function () {
    return _badgeUnstyledClasses.getBadgeUtilityClass;
  }
});
Object.defineProperty(exports, "useBadge", {
  enumerable: true,
  get: function () {
    return _useBadge.default;
  }
});

var _BadgeUnstyled = _interopRequireDefault(require("./BadgeUnstyled"));

var _useBadge = _interopRequireDefault(require("./useBadge"));

var _badgeUnstyledClasses = _interopRequireWildcard(require("./badgeUnstyledClasses"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
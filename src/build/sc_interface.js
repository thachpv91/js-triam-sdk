'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Interface = require('es6-interface');
var constructorMethor = new Set(['constructor(args)']);
var mainMethod = new Set(['main(funcName,args)']);
var fallbackMethod = new Set(['fallback(args)']);

var SCInterface = exports.SCInterface = function (_Interface) {
  _inherits(SCInterface, _Interface);

  function SCInterface() {
    _classCallCheck(this, SCInterface);

    return _possibleConstructorReturn(this, (SCInterface.__proto__ || Object.getPrototypeOf(SCInterface)).call(this));
  }

  return SCInterface;
}(Interface(constructorMethor, mainMethod, fallbackMethod));
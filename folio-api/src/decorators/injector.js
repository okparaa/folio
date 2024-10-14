"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.Inject = Inject;
exports.container = new Map();
function Inject(cls) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (base, context) {
        context.addInitializer(function () {
            var instance = exports.container.get(cls);
            if (!instance) {
                instance = Reflect.construct(cls, args);
                exports.container.set(cls, instance);
            }
            this[context.name] = instance;
        });
    };
}

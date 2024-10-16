"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
exports.Inject = Inject;
exports.container = new Map();
function Inject(cls, ...args) {
    return (base, context) => {
        context.addInitializer(function () {
            let instance = exports.container.get(cls);
            if (!instance) {
                instance = Reflect.construct(cls, args);
                exports.container.set(cls, instance);
            }
            this[context.name] = instance;
        });
    };
}

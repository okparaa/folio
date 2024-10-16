export const container = new Map();
export function Inject(cls: any, ...args: any[]) {
  return <T, V>(base: unknown, context: ClassFieldDecoratorContext<T, V>) => {
    context.addInitializer(function () {
      let instance = container.get(cls);
      if (!instance) {
        instance = Reflect.construct(cls, args);
        container.set(cls, instance);
      }
      this[context.name as keyof T] = instance;
    });
  };
}

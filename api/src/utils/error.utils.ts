export function throwErr(message: any) {
  throw new Error(message);
}

export async function tryCatch<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[]
): Promise<[undefined, T] | [InstanceType<E>]> {
  try {
    const data = await promise;
    return [undefined, data] as [undefined, T];
  } catch (error) {
    if (errorsToCatch == undefined) {
      return [error as InstanceType<E>];
    }
    if (errorsToCatch.some((e) => error instanceof e)) {
      return [error as InstanceType<E>];
    }
    throw error;
  }
}

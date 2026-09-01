/**
 * Returns an array containing the instance method names defined on a class prototype, excluding the constructor.
 */
export function getClassMethods<T>(cls: new (...args: any[]) => T): (keyof T)[] {
  // Get the names of all properties defined on the class prototype
  const prototypeNames = Object.getOwnPropertyNames(cls.prototype);

  // Remove the constructor property from the result and return
  return prototypeNames.filter((key) => key !== 'constructor') as (keyof T)[];
}

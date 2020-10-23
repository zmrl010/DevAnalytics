/**
 * Object.freeze wrapper to create immutable objects
 * @param obj
 */
export default function freeze<O>(obj: O): Readonly<O> {
  return Object.freeze(obj);
}

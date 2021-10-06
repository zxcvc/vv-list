import { throttle as _throttle } from "lodash";

export function throttle<T extends (...arg: any) => any>(
  fn: T,
  time: number
): T {
  if (time < 0) throw new RangeError("arg 'time' must >= 0");
  if (time === 0) return fn;
  return _throttle(fn, time, { leading: true, trailing: true }) as unknown as T;
}

export const generate = <T, R>(fn: () => Iterator<T, R>): Iterable<T> => {
  return { [Symbol.iterator]: fn };
};

export const numericSequence = (beginning: number, step: number) => {
  return generate(() => {
    let i = beginning;
    return {
      next() {
        const value = i;
        i += step;
        return { value, done: false };
      },
    };
  });
};

export const map = <T, I extends Iterable<T>, R>(
  mapper: (v: T) => R,
  iterable: I,
) => {
  return generate(() => {
    const iterator = iterable[Symbol.iterator]();

    return {
      next: () => {
        const { done, value } = iterator.next();

        return { done, value: done ? undefined : mapper(value) };
      },
    };
  });
};

export const reduce = <T, I extends Iterable<T>, R>(
  reducer: (acc: R, cur: T) => R,
  initialValue: R,
  iterable: I,
) => {
  const iterator = iterable[Symbol.iterator]();
  let iterationResult;
  let accumulator = initialValue;
  do {
    iterationResult = iterator.next();
    accumulator = iterationResult.done
      ? accumulator
      : reducer(accumulator, iterationResult.value);
  } while (!iterationResult.done);
  return accumulator;
};

export const filter = <T, I extends Iterable<T>>(
  fn: (v: T) => boolean,
  iterable: I,
) => {
  return generate(() => {
    const iterator = iterable[Symbol.iterator]();

    return {
      next: () => {
        let done;
        let value;
        do {
          const next = iterator.next();
          done = next.done;
          value = next.value;
        } while (!done && !fn(value));
        return { done, value };
      },
    };
  });
};

export const until = <T>(fn: (v: T) => boolean, iterable: Iterable<T>) => {
  return generate(() => {
    const iterator = iterable[Symbol.iterator]();

    return {
      next: () => {
        let { done, value } = iterator.next();
        done = done || fn(value);
        value = done ? undefined : value;
        return { done, value };
      },
    };
  });
};

export const first = <T>(iterable: Iterable<T>): T => {
  return iterable[Symbol.iterator]().next().value;
};

export const rest = <T>(iterable: Iterable<T>) => {
  return generate(() => {
    const iterator = iterable[Symbol.iterator]();

    iterator.next();
    return iterator;
  });
};

export const take = <T>(numberToTake: number, iterable: Iterable<T>) => {
  return generate(() => {
    const iterator = iterable[Symbol.iterator]();
    let remainingElements = numberToTake;

    return {
      next: () => {
        let { done, value } = iterator.next();

        done = done || remainingElements <= 0;
        value = done ? undefined : value;
        remainingElements -= 1;

        return { done, value };
      },
    };
  });
};

export const getValue = <T, I extends Iterable<T>>(iterable: I) =>
  Array.from(iterable);

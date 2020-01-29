# Async Iterators

A chainable reference implementation of lazy iterators.

## Examples

Works with any iterable.

```ts
import * as iterators from './src/index';

const map = curry(iterators.map);
const filter = curry(iterators.map);

const cubicPar = compose(
  filter((x: number) => x % 2 === 0),
  map((x: number) => x * x * x),
  take(5),
);

const sequence = iterators.numericSequence(1, 20);
const test = cubicPar(sequence);
expect(iterators.getValue(test)).toStrictEqual([8, 64, 216, 512, 1000]);
```

Anything that implements `Symbol.iterable`.

```ts
import * as iterators from './src/index';

const reduce = curry(iterators.reduce);
const filter = curry(iterators.filter);

const testPipe = compose(
  filter(char => char !== 't'),
  reduce((acc, cur) => acc + cur),
);

const test = 'testtesttest';
const testValue = testPipe(test);

expect(iterators.getValue(testValue)).toBe('eseses');
```

Works well with functional libraries that do `curry` and `compose`.

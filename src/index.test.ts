import {
  map,
  filter,
  take,
  getValue,
  reduce,
  until,
  first,
  rest,
  numericSequence,
} from '.';

describe(`index`, () => {
  it(`infinite even numbers sequence`, () => {
    const infinite = numericSequence(0, 1);

    const evens = filter((v: number) => !(v % 2), infinite);

    const test = take(5, evens);

    expect(getValue(test)).toStrictEqual([0, 2, 4, 6, 8]);
  });

  it(`reduce to sum numbers`, () => {
    const infinite = numericSequence(0, 1);

    const evens = filter((v: number) => !(v % 2), infinite);

    const test = take(5, evens);

    expect(reduce((acc: number, next: number) => acc + next, 0, test)).toBe(20);
  });

  it(`odd number until 9`, () => {
    const infinite = numericSequence(1, 2);

    const test = until(v => v === 9, infinite);

    expect(getValue(test)).toStrictEqual([1, 3, 5, 7]);
  });

  it(`first number`, () => {
    const infinite = numericSequence(1, 2);

    const test = first(infinite);

    expect(test).toStrictEqual(1);
  });

  it(`rest of the sequence`, () => {
    const infinite = numericSequence(1, 2);

    const skipFirst = rest(infinite);

    const test = take(5, skipFirst);

    expect(getValue(test)).toStrictEqual([3, 5, 7, 9, 11]);
  });

  it(`cubicPar example`, () => {
    const cubicPar = (iterable: Iterable<number>) =>
      filter(
        (x: number) => x % 2 === 0,
        map((x: number) => x * x * x, iterable),
      );

    const fiveElements = take(10, cubicPar([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));
    expect(getValue(fiveElements)).toStrictEqual([8, 64, 216, 512, 1000]);
  });

  it(`string filter example`, () => {
    const test = 'testtesttest';
    const testValue = filter(char => char !== 't', test);

    expect(getValue(testValue).join('')).toBe('eseses');
  });
});

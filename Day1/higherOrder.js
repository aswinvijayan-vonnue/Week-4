const double = (num) => num * 2;
const addOne = (num) => num + 1;
const triple = (num) => num * 3;
const increment = (num) => num + 1;
const decrement = (num) => num - 1;
const pipe =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg);
//piped function
const pipedFunction = pipe(double, addOne);
//left to right so return 11
console.log('piped function 1', pipedFunction(5));
//returns true
console.log(pipe(double, addOne)(5) === 11);
const pipedFunction2 = pipe(addOne, triple, increment);
console.log('piped function 2:', pipedFunction2(5));
const pipedFunction3 = pipe(triple, decrement, double);
console.log('piped function 3', pipedFunction3(5));

const composition =
  (...fns) =>
  (arg) =>
    fns.reduceRight((acc, fn) => fn(acc), arg);

const compositionedFunction = composition(double, addOne);
//right to left so returns 12
console.log('compositioned function 1', compositionedFunction(5));
const compositionedFunction2 = composition(addOne, triple, increment);
console.log('Compositioned function 2', compositionedFunction2(5));

const compositionedFunction3 = composition(triple, decrement, double);
console.log('Compositioned function 3:', compositionedFunction3(6));
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function (...nextargs) {
        return curried.apply(this, args.concat(nextargs));
      };
    }
  };
}
const addThree = (a, b, c) => a + b + c;
let val = curry(addThree);
console.log('curried function 1:', val(3, 10)(20));
console.log('curried function 2:', val(12)(20)(30));
console.log('curried function 3:', val(13, 4, 12));

function partial(fn, ...firstArgs) {
  return function (...remainingArgs) {
    return fn.apply(this, firstArgs.concat(remainingArgs));
  };
}

const discount = (denominator, rate, price) => (price * rate) / denominator;
const fiftyOffer = partial(discount, 100, 50);
console.log('partial 1:', fiftyOffer(2000));
const multiply = (x, y) => x * y;
const multiplyByTwo = partial(multiply, 2);
console.log('partial 2:', multiplyByTwo(12));
const subtract = (x, y) => x - y;
const subtractFrom = partial(subtract, 100);
console.log('partial 3:', subtractFrom(12));

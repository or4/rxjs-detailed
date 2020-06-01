import { delay } from 'rxjs/operators';
import { of, zip } from 'rxjs';
// import { of, combineLatest } from 'rxjs';

const letters = of('a', 'b', 'c').pipe(delay(100));
const digits = of('1');

// in any case 'a-1'
const result = zip(letters, digits, (a: string, b: string) => `${a}-${b}`);

// with delay 'a-1' 'b-1' 'c-1'
// without delay take last 'c-1'
// const result = combineLatest(letters, digits, (a: string, b: string) => `${a}-${b}`);

result.subscribe({ next: x => console.log(x) });

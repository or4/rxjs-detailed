import { zip, interval } from 'rxjs';
// import { combineLatest, interval } from 'rxjs';
import { map } from 'rxjs/operators';

const arr = ['a', 'b', 'c'];

const letters = interval(3000).pipe(map(i => arr[i % 3]));
const digits = interval(10);

// отдает с последними значениями
//a-0 b-1 с-2 a-3 b-4 c-5
const result = zip(letters, digits, (a: string, b: string) => `${a}-${b}`);

// отдает все значения
// a-0 a-2 ... a-587 b-587 ...
// const result = combineLatest(letters, digits, (a: string, b: string) => `${a}-${b}`);

result.subscribe({ next: x => console.log(x) });

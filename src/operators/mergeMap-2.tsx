import { of, interval } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

// it create 3 interval stream that each return 'letter + i'

const letters = of('a', 'b', 'c');
const result = letters.pipe(
    mergeMap(x => {
        return interval(1000).pipe(
            map(i => {
                return x + i;
            })
        );
    })
);
result.subscribe(x => console.log(x));

// Results in the following:
// a0
// b0
// c0
// a1
// b1
// c1
// continues to list a,b,c with respective ascending integers

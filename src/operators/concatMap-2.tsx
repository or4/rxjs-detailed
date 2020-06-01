import { of, interval } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

// it should create 3 interval stream but return 'a + i'
// concatMap is single threaded, and
// before interval with letter 'a' not finished, it cannot start next stream

const letters = of('a', 'b', 'c');
const result = letters.pipe(
    concatMap(x => {
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

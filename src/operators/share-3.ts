// Make Observables hot only where necessary

import { interval } from 'rxjs';
import { filter, map, share, take, toArray } from 'rxjs/operators';

const clock$ = interval(100).pipe(
    // share(),
    take(7)
);

const randomNum$ = clock$.pipe(
    map(() => Math.random() * 100),
    share()
);

const smallNum$ = randomNum$.pipe(
    filter(x => x <= 50),
    toArray()
);

const largeNum$ = randomNum$.pipe(
    filter(x => x > 50),
    toArray()
);

randomNum$.subscribe(x => console.log('random: ' + x));
smallNum$.subscribe(x => console.log('small:', x));
largeNum$.subscribe(x => console.log('large:', x));

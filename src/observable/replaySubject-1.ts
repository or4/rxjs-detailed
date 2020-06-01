import { interval, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new ReplaySubject(1000);

interval(500).subscribe(i => s$.next(i));

const clock$ = s$.pipe(take(4));

clock$.subscribe(console.log);

setTimeout(() => {
    clock$.subscribe(console.log);
}, 5000);

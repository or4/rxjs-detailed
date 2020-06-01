import { interval, Subject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new Subject();

interval(500).subscribe(i => s$.next(i));

const clock$ = s$.pipe(take(7));

clock$.subscribe(console.log);

setTimeout(() => {
    clock$.subscribe(console.log);
}, 2000);

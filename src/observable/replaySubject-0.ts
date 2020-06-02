import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new ReplaySubject(1);

const clock$ = s$.pipe(take(1));

s$.next(1);

clock$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

setTimeout(() => {
    s$.unsubscribe();
}, 2000);

import { ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new ReplaySubject(0);

const clock$ = s$.pipe(take(1));

s$.next(2);
s$.complete();

clock$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

import { AsyncSubject } from 'rxjs';

const s$ = new AsyncSubject();

s$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

s$.next(1);
s$.next(2);
s$.next(3);
s$.complete();

s$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

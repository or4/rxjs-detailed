import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new BehaviorSubject(1);

s$.next(2);

const clock$ = s$.pipe(take(2));

clock$.subscribe({
    next: i => console.log(s$.getValue(), i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

s$.next(3);

setTimeout(() => {
    s$.unsubscribe();
}, 2000);

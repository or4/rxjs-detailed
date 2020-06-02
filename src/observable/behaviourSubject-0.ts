import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new BehaviorSubject(1);

const clock$ = s$.pipe(take(1));

clock$.subscribe({
    next: i => console.log(s$.getValue(), i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

setTimeout(() => {
    s$.unsubscribe();
}, 2000);

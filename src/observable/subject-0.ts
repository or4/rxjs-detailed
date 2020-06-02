import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new Subject();

const clock$ = s$.pipe(take(1));

s$.next(1); // show nothing

clock$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

setTimeout(() => {
    s$.unsubscribe();
}, 2000);

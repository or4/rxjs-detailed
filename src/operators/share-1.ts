import { interval } from 'rxjs';
import { take, share } from 'rxjs/operators';

const clock$ = interval(500).pipe(
    // позволяет использовать обоим subscribe один interval
    // иначе interval запускается сначала для каждого subscribe
    share(),
    take(7)
);

clock$.subscribe(console.log);

setTimeout(() => {
    clock$.subscribe(console.log);
}, 2000);

import { interval } from 'rxjs';
import { take, shareReplay } from 'rxjs/operators';

const clock$ = interval(500).pipe(
    // позволяет использовать обоим subscribe один interval
    // иначе interval запускается сначала для каждого subscribe
    shareReplay(1000),
    take(7)
);

clock$.subscribe(console.log);

setTimeout(() => {
    clock$.subscribe(console.log);
}, 2000);

import { interval, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

const s$ = new BehaviorSubject(-1);

interval(500).subscribe(i => s$.next(i));

const clock$ = s$.pipe(take(4));

clock$.subscribe(i => console.log(s$.getValue(), i));

setTimeout(() => {
    console.log('s$.getValue() 2', s$.getValue());
}, 4000);

setTimeout(() => {
    console.log('s$.getValue() 4', s$.getValue());
}, 4000);

// setTimeout(() => {
//     clock$.subscribe(console.log);
// }, 2000);

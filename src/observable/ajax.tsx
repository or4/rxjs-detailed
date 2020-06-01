import { interval, Subject, empty } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

const resume$ = new Subject<boolean>();

const res$ = resume$.pipe(
    switchMap(resume => {
        return resume ? interval(1000) : empty();
    }),
    tap(x => console.log('request it!', x)),
    switchMap(() =>
        ajax({
            url: 'https://jsonplaceholder.typicode.com/users/2',
            method: 'GET',
        })
    ),
    map((data: any) => data['response'].name)
);

res$.subscribe(console.log);

resume$.next(false);

setTimeout(() => {
    resume$.next(true);
}, 2000);

setTimeout(() => {
    resume$.next(false);
}, 7000);

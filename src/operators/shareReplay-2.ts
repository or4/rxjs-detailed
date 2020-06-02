import { from } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

const myFetch = new Promise(resolve => {
    setTimeout(() => {
        console.log('promise resolve');
        resolve('user-data');
    }, 1000);
});

const TIME = 1000;
const user$ = from(myFetch).pipe(shareReplay(1, TIME));

user$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});
user$.subscribe({
    next: i => console.log(i),
    complete: () => console.log('complete'),
    error: err => console.log('err', err),
});

setTimeout(() => {
    user$.subscribe({
        next: i => console.log(i), // не сработает, нужно делать как-то перезапрос
        complete: () => console.log('complete'), // выполнится
        error: err => console.log('err', err),
    });
}, 4000);

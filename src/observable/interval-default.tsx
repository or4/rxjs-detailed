import { take } from 'rxjs/operators';
import { interval } from 'rxjs';

window.onload = () => {
    const source$ = interval(1000).pipe(take(5));

    source$.subscribe(console.log);
};

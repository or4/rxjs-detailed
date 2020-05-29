import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const observable = new Observable<number>(subscriber => {
    console.log('\n\n');
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
});

const newObs = observable.pipe(map((count, index) => index * 2));

newObs.subscribe(console.log);

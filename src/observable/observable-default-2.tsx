import { Observable, Subscriber } from 'rxjs';

const producer = (subscriber: Subscriber<number>) => {
    console.log('\n\n');
    subscriber.next(1);
    subscriber.next(2);
    subscriber.next(3);
    subscriber.next(4);
    subscriber.complete();
};

const observable = new Observable<number>(producer);

observable.subscribe((val: number) => console.log('case 1', val));

observable.subscribe({
    next(x) {
        console.log('case 2', 'got value ' + x);
    },
    error(err) {
        console.error('case 2', 'something wrong occurred: ' + err);
    },
    complete() {
        console.log('case 2', 'done');
    },
});

observable.subscribe(
    x => {
        console.log('case 3', 'got value ' + x);
    },
    err => {
        console.error('case 3', 'something wrong occurred: ' + err);
    },
    () => {
        console.log('case 3', 'done');
    }
);

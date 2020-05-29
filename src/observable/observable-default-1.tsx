// When we subscribe twice, observer code run twice too

import { Subject, Observable } from 'rxjs';
const producer = (observer: any) => {
    console.log('next 1');
    observer.next('foo');

    setTimeout(() => {
        console.log('next 2');
        observer.next('bar');
    }, 1000);
};

const myObservable: Subject<string> = Observable.create(producer);

myObservable.subscribe(value => console.log('subscribe 1', value));
myObservable.subscribe(value => console.log('subscribe 2', value));

// Output:
//   next 1
//   subscribe 1 foo
//   next 1
//   subscribe 2 foo
//   next 2
//   subscribe 1 bar
//   next 2
//   subscribe 2 bar

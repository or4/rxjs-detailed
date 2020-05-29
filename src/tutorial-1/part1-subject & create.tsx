// http://reactivex.io/rxjs/manual/tutorial.html

import { Subject, Observable } from 'rxjs';

// Externally produce new events.

const myObservableSubject = new Subject();
myObservableSubject.subscribe(value => console.log(value));
myObservableSubject.next('foo');

// Internally produce new events.
const myObservable: Subject<unknown> = Observable.create((observer: any) => {
    observer.next('foo');
    setTimeout(() => observer.next('bar'), 1000);
});
// myObservable.next(100);
myObservable.subscribe(value => console.log('myObservable', value));

// Which one you choose depends on the scenario.
// The normal Observable is great when you want to
// wrap functionality that produces values over time.
// An example would be a websocket connection.
// With Subject you can trigger new events from anywhere
// really and you can connect existing observables to it.

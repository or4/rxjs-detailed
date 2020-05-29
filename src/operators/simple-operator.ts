import { Observable, Observer, of } from 'rxjs';

const myOperator = <T>(source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                console.log('next', next);
                observer.next(next);
            },
            (error: any) => {
                console.log('error', error);
                observer.error(error);
            },
            () => {
                console.log('complete');
                observer.complete();
            }
        );

        return subscription;
    });
};

of(1)
    .pipe(myOperator)
    .subscribe(
        val => console.log('total', val),
        () => {},
        () => {
            console.log('total complete');
        }
    );

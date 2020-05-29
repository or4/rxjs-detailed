import { Observable, Observer, of } from 'rxjs';

const myMap = (func: (value: number) => number) => (source: Observable<number>) => {
    return new Observable((observer: Observer<number>) => {
        const subscription = source.subscribe(
            (next: number) => {
                observer.next(func(next));
            },
            (error: any) => {
                observer.error(error);
            },
            () => {
                observer.complete();
            }
        );

        return subscription;
    });
};

of(1)
    .pipe(myMap((val: number) => val * 3))
    .subscribe(
        val => console.log('total', val),
        () => {},
        () => {
            console.log('total complete');
        }
    );

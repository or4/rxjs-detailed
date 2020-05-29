// https://www.youtube.com/watch?v=2kg0ko38wTA&list=PL7Z4uBV2KGdv5nTpKGlScdMbeVzM02b7L

interface Observer<T> {
    next: (n: T) => void;
    error: (err: any) => void;
    complete: () => void;
}

// Subscriber - это объект или функция, которая связывает Observable и Observer
// в классическом Subscriber'е на каждый subscribe вызывается метод producer'а
export class Observable<T> {
    private producer: (observer: Observer<T>) => void;

    public constructor(producer: (observer: Observer<T>) => void) {
        this.producer = producer;
    }

    public subscribe(observer: Observer<T>) {
        this.producer(observer);
    }
}

// Продьюсер - функция, которая формирует последовательность
const producer = (observer: Observer<number>) => {
    observer.next(1);

    setTimeout(() => observer.next(2), 1000);

    setTimeout(() => observer.complete(), 2000);
};

// Observable - это объект или функция, которая выдает последовательности данных во времени
// это может быть кастом, это может быть таймер или массив с delay
const observable$ = new Observable<number>(producer);

// Observer - это объект или функция, которая знает, как обрабатывать последовательности данных
const observer: Observer<number> = {
    next: (n: number) => {
        console.log(n);
    },
    error: (err: any) => console.log('error', err),
    complete: () => console.log('complete'),
};

observable$.subscribe(observer);

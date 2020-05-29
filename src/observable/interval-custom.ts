// https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=intro#app

import { Observable, Observer } from 'rxjs';

export const myInterval = (intervalTime: number) => {
    return new Observable((observer: Observer<number>) => {
        let count = 0;

        const intervalId = setInterval(() => {
            observer.next(count++);
        }, intervalTime);

        return () => {
            clearInterval(intervalId);
        };
    });
};

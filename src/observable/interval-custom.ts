// https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=intro#app

import { Observable, Observer } from 'rxjs';

// for debug in other files
let intervalCounter = 0;

export const myInterval = (intervalTime: number) => {
    return new Observable((observer: Observer<string>) => {
        let count = 0;

        const myIntervalCounter = intervalCounter++;

        const intervalId = setInterval(() => {
            observer.next(`${myIntervalCounter}# ${count}`);
            count++;
        }, intervalTime);

        return () => {
            console.log(`unsubscribe #${myIntervalCounter}`);
            clearInterval(intervalId);
        };
    });
};

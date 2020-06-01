import { fromEvent, interval } from 'rxjs';
import { concatMap, take, mapTo, map } from 'rxjs/operators';

const clicks = fromEvent(document, 'click');
const result = clicks.pipe(
    mapTo('btn-click'),
    concatMap(arg => {
        return interval(100).pipe(
            map(i => `${arg} - ${i}`),
            take(4)
        );
    })
);
result.subscribe(x => console.log(x));

// Results in the following:
// (results are not concurrent)
// For every click on the "document" it will emit values 0 to 3 spaced
// on a 1000ms interval
// one click = 1000ms-> 0 -1000ms-> 1 -1000ms-> 2 -1000ms-> 3

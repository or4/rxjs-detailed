import * as React from 'react';

import { Subject, timer } from 'rxjs';
import { mergeMap, mapTo, takeUntil } from 'rxjs/operators';
import { myInterval as interval } from 'observable/interval-custom';

export function MergeMapExample() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const destroy = new Subject();
        setTimeout(() => {
            destroy.next(true);
        }, 9000);

        interval(3000)
            .pipe(
                mapTo('interval-happens'),
                mergeMap((/* arg, index */) => {
                    // когда происходит клик выполняется этот метод
                    // в аргументы прилетает значение и индекс

                    // то что мы возвращаем, может быть Observable или чем-то другим
                    // если возвращаем Observable, то он просто запускается
                    // если возвраем что-то другое, то значение оборачивается оператором from

                    // unsubscribe нового возращаемого потока и изначального потока
                    // вызываются при вызове takeUntil перед subscribe

                    // в subscribe попадает, то что возвращается из этого метода

                    // на каждый клик создается новый поток, который попадает в subscribe

                    return timer(500, 1000);
                }),
                takeUntil(destroy)
            )
            .subscribe(console.log);
    }, []);

    return (
        <div>
            <h1>MergeMapExample</h1>
            <button ref={buttonRef}>button</button>
        </div>
    );
}

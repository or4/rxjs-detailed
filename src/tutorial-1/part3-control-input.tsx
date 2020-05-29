import * as React from 'react';

import { fromEvent } from 'rxjs';
import { map, pluck, pairwise, distinct, distinctUntilChanged } from 'rxjs/operators';

export function Input() {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const input$ = fromEvent(inputRef.current as HTMLInputElement, 'input');

        // Pass on a new value
        input$
            .pipe(map((event: any) => event.target.value))
            .pipe()
            .subscribe(value => console.log(value)); // "h"

        // Pass on a new value by plucking it
        input$
            .pipe(pluck('target', 'value'))
            .pipe()
            .subscribe(value => console.log(value)); // "h"

        // Pass the two previous values
        input$
            .pipe(pluck('target', 'value'))
            .pipe(pairwise())
            .subscribe(value => console.log(value)); // ["h", "e"]

        // Only pass unique values through
        // if enter multiple times same value, it will be drop
        input$
            .pipe(
                pluck('target', 'value'),
                distinct()
            )
            .pipe()
            .subscribe(value => console.log(value));

        // Do not pass repeating values through
        input$
            .pipe(pluck('target', 'value'))
            .pipe(distinctUntilChanged())
            .subscribe(value => console.log(value)); // "helo world"
    }, []);

    return (
        <div>
            <input ref={inputRef} />
        </div>
    );
}

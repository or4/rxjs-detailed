// About state in rx.js

import * as React from 'react';

import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

export function Button() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const stream$ = fromEvent(buttonRef.current as HTMLButtonElement, 'click');

        stream$.pipe(scan(count => count + 1, 0)).subscribe(console.log);
    }, []);

    return (
        <div>
            <button ref={buttonRef}>button</button>
        </div>
    );
}

// Creating applications
// RxJS is a great tool to keep your code less error prone.
// It does that by using pure and stateless functions.
// But applications are stateful, so how do we bridge the stateless world of RxJS with the stateful world of our applications?

// Let us create a simple state store of the value 0.
// On each click we want to increase that count in our state store.

// So producing state is within the world of RxJS,
// but changing the DOM is a side effect which happens at "the end of the line".

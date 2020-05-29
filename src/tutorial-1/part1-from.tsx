// http://reactivex.io/rxjs/manual/tutorial.html

import * as React from 'react';

import { from, fromEvent } from 'rxjs';

// From array of values
from([1, 2, 3]).subscribe(console.log);

// From an event
export function Button() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    React.useEffect(() => {
        fromEvent(buttonRef.current as HTMLButtonElement, 'click').subscribe(console.log);
    }, []);

    return <button ref={buttonRef}>button</button>;
}

// From a Promise
from(fetch('/users')).subscribe(console.log);

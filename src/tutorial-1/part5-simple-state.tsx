// State stores

import * as React from 'react';

import { fromEvent } from 'rxjs';
import { map, scan } from 'rxjs/operators';

export function SimpleState() {
    const increaseButtonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        // Applications use state stores to hold state.
        // These are called different things in different frameworks,
        // like store, reducer and model, but at the core they are all just a plain object.
        // What we also need to handle is that multiple observables can update a single state store.
        const increaseButton = increaseButtonRef.current as HTMLButtonElement;

        const increase = fromEvent(increaseButton, 'click').pipe(
            map(() => (state: any) => Object.assign({}, state, { count: state.count + 1 }))
        );

        // What we do here is mapping a click event to a state changing function.
        // So instead of mapping to a value, we map to a function.
        // A function will change the state of our state store.
        // So now let us see how we actually make the change.
        increase.pipe(scan((state, changeFn) => changeFn(state), { count: 0 })).subscribe(console.log);
    }, []);

    return (
        <div>
            <button ref={increaseButtonRef}>increase button</button>
        </div>
    );
}

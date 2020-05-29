// State stores

import * as React from 'react';

import { fromEvent, merge } from 'rxjs';
import { map, scan } from 'rxjs/operators';

export function ExampleOfState() {
    const increaseButtonRef = React.useRef<HTMLButtonElement>(null);
    const decreaseButtonRef = React.useRef<HTMLButtonElement>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const increaseButton = increaseButtonRef.current as HTMLButtonElement;
        const decreaseButton = decreaseButtonRef.current as HTMLButtonElement;
        const inputElement = inputRef.current as HTMLInputElement;

        const increase = fromEvent(increaseButton, 'click').pipe(
            map(() => (state: any) => Object.assign({}, state, { count: state.count + 1 }))
        );
        const decrease = fromEvent(decreaseButton, 'click').pipe(
            map(() => (state: any) => Object.assign({}, state, { count: state.count - 1 }))
        );
        const input = fromEvent(inputElement, 'input').pipe(
            map((event: any) => (state: any) => Object.assign({}, state, { inputValue: event.target.value }))
        );

        const stream = merge(increase, decrease, input).pipe(
            scan((state, changeFn: any) => changeFn(state), {
                count: 0,
                inputValue: '',
            })
        );
        stream.subscribe(console.log);

        // To optimize our rendering we can check what state
        // has actually changed
        let prevState: any = {};
        stream.subscribe(state => {
            if (state.count !== prevState.count) {
                console.log('state.count', state.count);
            }
            if (state.inputValue !== prevState.inputValue) {
                console.log('inputValue', 'Hello ' + state.inputValue);
            }
            prevState = state;
        });
    }, []);

    return (
        <div>
            <button ref={increaseButtonRef}>increase button</button>
            <button ref={decreaseButtonRef}>decrease button</button>
            <input ref={inputRef} />
        </div>
    );
}

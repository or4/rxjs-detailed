import * as React from 'react';
import { filter, map, delay, throttleTime, debounceTime, take, takeUntil } from 'rxjs/operators';

import { fromEvent } from 'rxjs';

// Controlling the flow
// typing "hello world"

export function InputWithButton() {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const input$ = fromEvent(inputRef.current as HTMLInputElement, 'input');

        // Filter out target values less than 3 characters long
        input$
            .pipe(filter((event: any) => event.target.value.length > 2))
            .pipe(map((event: any) => event.target.value))
            .subscribe((value: string) => console.log('case 1', value)); // "hel"

        // Delay the events
        input$
            .pipe(delay(200))
            .pipe(map((event: any) => event.target.value))
            .subscribe((value: string) => console.log('case 2', value)); // "h" -200ms-> "e" -200ms-> "l" ...

        // Only let through an event every 200 ms
        // ! throttleTime without last value
        input$
            .pipe(throttleTime(2000))
            .pipe(map((event: any) => event.target.value))
            .subscribe((value: string) => console.log('case 3', value)); // "h" -200ms-> "w"

        // Let through latest event after 200 ms
        // ! debounce with last value
        input$
            .pipe(debounceTime(2000))
            .pipe(map((event: any) => event.target.value))
            .subscribe((value: string) => console.log('case 4', value)); // "o" -200ms-> "d"

        // Stop the stream of events after 3 events
        input$
            .pipe(take(3))
            .pipe(map((event: any) => event.target.value))
            .subscribe((value: string) => console.log('case 5', value)); // "hel"

        // Passes through events until other observable triggers an event
        const stopStream = fromEvent(buttonRef.current as HTMLButtonElement, 'click');

        input$
            .pipe(takeUntil(stopStream))
            .pipe(map((event: any) => event.target.value))
            .subscribe((value: string) => console.log(value)); // "hello" (click)
    }, []);

    return (
        <div>
            <input ref={inputRef} />
            <button ref={buttonRef}>button</button>;
        </div>
    );
}

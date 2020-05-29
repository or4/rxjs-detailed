import * as React from 'react';

import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

export function Button() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const stream$ = fromEvent(buttonRef.current as HTMLButtonElement, 'click');

        stream$.pipe(map((count, index) => index * 2)).subscribe(console.log);
    }, []);

    return (
        <div>
            <button ref={buttonRef}>button</button>
        </div>
    );
}

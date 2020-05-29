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

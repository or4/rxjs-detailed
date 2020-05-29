import * as React from 'react';

import { fromEvent } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { myInterval as interval } from 'observable/interval-custom';

export function SwitchMapExample() {
    const buttonRef = React.useRef<HTMLButtonElement>(null);

    React.useEffect(() => {
        const interval$ = interval(500);
        const click$ = fromEvent(buttonRef.current as HTMLButtonElement, 'click');

        click$
            .pipe(
                switchMap(arg => {
                    console.log('switchMap arg', arg); // возвращается MouseEvent на каждый клик

                    // когда происходит клик завершается предыдущий interval$
                    // у предыдущего потока вызывается unsubscribe и запускается новый поток interval
                    // как будто на каждый клик мы делаем unsubscribe и затем subscribe
                    // удобвно смотреть на само написанном interval с логами в unsubscribe
                    return interval$;
                })
            )
            .subscribe(console.log);
    }, []);

    return (
        <div>
            <button ref={buttonRef}>button</button>
        </div>
    );
}

import * as React from 'react';

import { fromEvent, Observable } from 'rxjs';
import { map, pairwise, switchMap, takeUntil, withLatestFrom, startWith } from 'rxjs/operators';

export function Example1() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const rangeRef = React.useRef<HTMLInputElement>(null);
    const colorRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const range = rangeRef.current as HTMLInputElement;
        const color = colorRef.current as HTMLInputElement;
        const context = canvas.getContext('2d') as CanvasRenderingContext2D;

        const mouseMove$ = fromEvent<React.MouseEvent>(canvas, 'mousemove');
        const mouseDown$ = fromEvent<React.MouseEvent>(canvas, 'mousedown');
        const mouseUp$ = fromEvent<React.MouseEvent>(canvas, 'mouseup');
        const mouseOut$ = fromEvent<React.MouseEvent>(canvas, 'mouseout');

        const lineWidth$ = createInputStream(range);
        const strokeStyle$ = createInputStream(color);

        const stream$ = mouseDown$.pipe(
            withLatestFrom(lineWidth$, strokeStyle$, (_, lineWidth, strokeStyle) => {
                return { lineWidth, strokeStyle };
            }),
            switchMap(options => {
                return mouseMove$.pipe(
                    map(e => ({
                        // @ts-ignore
                        x: e.offsetX,
                        // @ts-ignore
                        y: e.offsetY,
                        options,
                    })),
                    pairwise(),
                    takeUntil(mouseUp$),
                    takeUntil(mouseOut$)
                );
            })
        );

        stream$.subscribe(([from, to]) => {
            const { lineWidth, strokeStyle } = from.options;

            context.lineWidth = Number(lineWidth);
            context.strokeStyle = strokeStyle;

            context.beginPath();
            context.moveTo(from.x, from.y);
            context.lineTo(to.x, to.y);
            context.stroke();
        });
    }, []);

    const [rangeValue, setRangeValue] = React.useState('4');
    const [colorValue, setColorValue] = React.useState('#10db00');

    return (
        <div className="container">
            <canvas ref={canvasRef} width={800} height={400} />

            <div className="input-field">
                <input
                    ref={rangeRef}
                    type="range"
                    min="1"
                    max="4"
                    id="range"
                    value={rangeValue}
                    onChange={event => setRangeValue(event.target.value)}
                />
            </div>

            <div className="input-field">
                <input
                    ref={colorRef}
                    type="color"
                    id="color"
                    value={colorValue}
                    onChange={event => setColorValue(event.target.value)}
                />
            </div>
        </div>
    );
}

function createInputStream(node: HTMLInputElement): Observable<string> {
    return fromEvent<React.ChangeEvent>(node, 'input').pipe(
        // @ts-ignore
        map(e => e.target && e.target.value),
        startWith(node.value)
    );
}

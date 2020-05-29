// http://reactivex.io/rxjs/manual/tutorial.html

import { bindCallback, bindNodeCallback } from 'rxjs';

// From a callback (last argument is a callback)
const exists = (path: string, cb: Function) => {
    console.log('exists path', path);
    cb(true);
};
const bindExists = bindCallback(exists);
bindExists('file.txt').subscribe(exists => console.log('Does file exist?', exists));

// From a callback (last argument is a callback)
// fs.rename = (pathA, pathB, cb(err, result))
const rename = (pathA: string, pathB: string, cb: Function) => {
    console.log('rename pathA', pathA, 'pathB', pathB);
    cb();
};

const bindRename = bindNodeCallback(rename);
bindRename('file.txt', 'else.txt').subscribe(() => console.log('Renamed!'));

// https://blog.strongbrew.io/build-the-operators-from-rxjs-from-scratch/?lectureId=intro#app

// import { interval } from 'rxjs';
import { myInterval } from './interval-custom';

describe('myInterval', () => {
    it('should work with custom', done => {
        const arr = [0, 1, 2, 3, 4, 5, 6, 7];

        myInterval(100).subscribe((val: number) => {
            const expectedValue = arr.shift();
            expect(val).toBe(expectedValue);

            if (arr.length === 0) {
                done();
            }
        });
    });
});

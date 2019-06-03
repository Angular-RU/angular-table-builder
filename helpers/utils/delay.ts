import { Fn } from '../../projects/table-builder/src/lib/table/interfaces/table-builder.internal';

export class Delay {
    public static timeout(done: Fn, fn: Fn, time: number = 2000): void {
        setTimeout(() => {
            fn();
            done();
        }, time);
    }
}

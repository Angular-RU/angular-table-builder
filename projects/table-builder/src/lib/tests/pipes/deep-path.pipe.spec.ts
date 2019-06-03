import { DeepPathPipe } from '../../table/pipes/deep-path.pipe';
import { PlainObject } from '../../table/interfaces/table-builder.internal';

describe('[TEST]: Deep path pipe', () => {
    it('should be correct extract', () => {
        const b: PlainObject = new DeepPathPipe().transform(
            {
                a: {
                    b: {
                        c: 1
                    }
                }
            },
            'a.b'
        );

        expect(b).toEqual({
            c: 1
        });

        const c: number = new DeepPathPipe().transform(
            {
                a: {
                    b: {
                        c: 1
                    }
                }
            },
            'a.b.c'
        );

        expect(c).toEqual(1);
    });
});

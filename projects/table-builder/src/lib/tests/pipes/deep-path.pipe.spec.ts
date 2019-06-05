import { DeepPathPipe } from '../../table/pipes/deep-path.pipe';
import { KeyMap } from '../../table/interfaces/table-builder.internal';

describe('[TEST]: Deep path pipe', () => {
    it('should be correct extract', () => {
        const b: KeyMap = new DeepPathPipe().transform(
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

    it('should be correct return object when set empty path', () => {
        const result: KeyMap = new DeepPathPipe().transform({ a: { b: 1 } }, '');
        expect(result).toEqual({ a: { b: 1 } });
    });
});

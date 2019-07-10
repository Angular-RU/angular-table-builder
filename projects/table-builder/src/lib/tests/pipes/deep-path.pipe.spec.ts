import { DeepPathPipe } from '../../table/pipes/deep-path.pipe';
import { KeyMap } from '../../table/interfaces/table-builder.internal';
import { TableBuilderOptionsImpl } from '../../table/config/table-builder-options';
import { UtilsService } from '../../table/services/utils/utils.service';

describe('[TEST]: Deep path pipe', () => {
    let pipe: DeepPathPipe;

    beforeEach(() => (pipe = new DeepPathPipe(new TableBuilderOptionsImpl(), new UtilsService())));

    it('should be correct extract', () => {
        const b: KeyMap = pipe.transform(
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

        const c: number = pipe.transform(
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
        const result: KeyMap = pipe.transform({ a: { b: 1 } }, '');
        expect(result).toEqual({ a: { b: 1 } });
    });

    it('should be correct create cache and invalidate', () => {
        const a: KeyMap = { a: { b: 1 } };
        const b: KeyMap = { a: { b: 2 } };
        expect(pipe.transform(a, 'a.b')).toEqual(1);
        expect(pipe.transform(b, 'a.b')).toEqual(2);
    });
});

import { UtilsService } from '../../table/services/utils/utils.service';
import { KeyMap } from '../../table/interfaces/table-builder.internal';

describe('UtilsService', () => {
    it('should be created', () => {
        const service: UtilsService = new UtilsService();
        expect(service).toBeTruthy();

        const row: KeyMap = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                },
                g: [1, 2, 3]
            }
        };

        expect(service.flattenKeysByRow(row)).toEqual(['a', 'b.c', 'b.d.e', 'b.g']);
    });
});

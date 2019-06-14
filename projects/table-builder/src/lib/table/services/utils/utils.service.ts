import { Injectable } from '@angular/core';
import { TableRow } from '../../interfaces/table-builder.external';
import { Any } from '../../interfaces/table-builder.internal';

@Injectable()
export class UtilsService {
    public flattenKeysByRow(row: TableRow, parentKey: string = null, keys: string[] = []): string[] {
        for (const key in row) {
            if (!row.hasOwnProperty(key)) {
                continue;
            }

            const element: Any = row[key];
            const isObject: boolean = typeof element === 'object' && element !== null && !Array.isArray(element);

            if (isObject) {
                const implicitKey: string = parentKey ? `${parentKey}.${key}` : key;
                this.flattenKeysByRow(row[key], implicitKey, keys);
            } else {
                keys.push(parentKey ? `${parentKey}.${key}` : key);
            }
        }

        return keys;
    }
}

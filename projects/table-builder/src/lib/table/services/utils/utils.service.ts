import { Injectable } from '@angular/core';

import { TableRow } from '../../interfaces/table-builder.external';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';
import { UtilsInterface } from './utils.interface';

@Injectable()
export class UtilsService implements UtilsInterface {
    public getValueByPath(object: KeyMap, path: string): KeyMap | undefined {
        return path ? path.split('.').reduce((value: string, key: string) => value && value[key], object) : object;
    }

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

    public checkValueIsEmpty(value: Any): boolean {
        const val: string = typeof value === 'string' ? value.trim() : value;
        return [undefined, null, NaN, '', 'null', Infinity].includes(val);
    }
}

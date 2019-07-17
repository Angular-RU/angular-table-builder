import { Injectable } from '@angular/core';

import { TableRow } from '../../interfaces/table-builder.external';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';
import { UtilsInterface } from './utils.interface';

@Injectable()
export class UtilsService implements UtilsInterface {
    public static readonly SCROLLBAR_WIDTH: number = 10;

    public get bodyRect(): ClientRect | DOMRect {
        return document.querySelector('body').getBoundingClientRect();
    }

    public isFirefox(userAgent: string = null): boolean {
        return (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
    }

    public clone<T = Any>(obj: T): T {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    }

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

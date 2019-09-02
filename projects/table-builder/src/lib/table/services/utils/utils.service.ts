import { Injectable, NgZone } from '@angular/core';

import { TableRow } from '../../interfaces/table-builder.external';
import { Any, Fn, KeyMap } from '../../interfaces/table-builder.internal';
import { UtilsInterface } from './utils.interface';
import { checkValueIsEmpty } from '../../operators/check-value-is-empty';

@Injectable()
export class UtilsService implements UtilsInterface {
    public static readonly SCROLLBAR_WIDTH: number = 10;

    constructor(private readonly zone: NgZone) {}

    public get bodyRect(): ClientRect | DOMRect {
        return document.querySelector('body').getBoundingClientRect();
    }

    private static replaceUndefinedOrNull(_: string, value: unknown): unknown {
        return checkValueIsEmpty(value) ? undefined : value;
    }

    public isFirefox(userAgent: string = null): boolean {
        return (userAgent || navigator.userAgent).toLowerCase().indexOf('firefox') > -1;
    }

    public clone<T = Any>(obj: T): T {
        return JSON.parse(JSON.stringify(obj || null)) || {};
    }

    public isObject<T = object>(obj: T): boolean {
        return obj === Object(obj);
    }

    public mergeDeep<T>(target: T, source: T): T {
        const output: T = { ...target };
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach((key: string) => {
                if (this.isObject(source[key])) {
                    if (!(key in target)) {
                        Object.assign(output, { [key]: source[key] });
                    } else {
                        output[key] = this.mergeDeep(target[key], source[key]);
                    }
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }

        return output;
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

    public clean(obj: KeyMap): KeyMap {
        return JSON.parse(JSON.stringify(obj, UtilsService.replaceUndefinedOrNull.bind(this)));
    }

    public requestAnimationFrame(callback: Fn): Promise<void> {
        return new Promise((resolve: Fn): void => {
            this.zone.runOutsideAngular(() => {
                window.requestAnimationFrame(() => {
                    callback();
                    resolve();
                });
            });
        });
    }

    public microtask(callback: Fn): Promise<void> {
        return new Promise((resolve: Fn): void => {
            callback();
            resolve();
        });
    }

    public macrotask(callback: Fn, time: number = 0): Promise<void> {
        return new Promise((resolve: Fn): void => {
            this.zone.runOutsideAngular(() => {
                window.setTimeout(() => {
                    callback();
                    resolve();
                }, time);
            });
        });
    }
}

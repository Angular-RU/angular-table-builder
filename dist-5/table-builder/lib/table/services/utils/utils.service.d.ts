import { NgZone } from '@angular/core';
import { TableRow } from '../../interfaces/table-builder.external';
import { Any, Fn, KeyMap } from '../../interfaces/table-builder.internal';
import { UtilsInterface } from './utils.interface';
export declare class UtilsService implements UtilsInterface {
    private readonly zone;
    static readonly SCROLLBAR_WIDTH: number;
    constructor(zone: NgZone);
    readonly bodyRect: ClientRect | DOMRect;
    private static replaceUndefinedOrNull;
    clone<T = Any>(obj: T): T;
    isObject<T = object>(obj: T): boolean;
    mergeDeep<T>(target: T, source: T): T;
    flattenKeysByRow(row: TableRow, parentKey?: string, keys?: string[]): string[];
    clean(obj: KeyMap): KeyMap;
    requestAnimationFrame(callback: Fn): Promise<void>;
    microtask(callback: Fn): Promise<void>;
    macrotask(callback: Fn, time?: number): Promise<void>;
}

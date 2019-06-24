import { Injectable } from '@angular/core';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';
import { SortOrderType } from './sortable-type.enum';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class SortableService {
    constructor(private readonly utils: UtilsService) {}

    public sortByKeys(data: Any[], keys: KeyMap<SortOrderType>): Any[] {
        const countKeys: number = Object.keys(keys).length;

        if (!countKeys) {
            return data.sort(this.shallowSort.bind(this));
        }

        const matches: KeyMap<number> = this.getMatchesKeys(keys);
        return data.sort((a: unknown, b: unknown) => this.multiSort(a, b, matches));
    }

    private multiSort(a: unknown, b: unknown, matches: KeyMap<number>): Any {
        const countKeys: number = Object.keys(matches).length;
        let sorted: number = 0;
        let ix: number = 0;

        while (sorted === 0 && ix < countKeys) {
            const key: string = this.observeKey(matches, ix);
            if (key) {
                const depth: number = matches[key];
                sorted = this.deepSort(key, a, b, depth);
                ix++;
            }
        }

        return sorted;
    }

    private getMatchesKeys(keys: KeyMap<SortOrderType | number>): KeyMap<number> {
        const matches: KeyMap<number> = {};

        for (const key in keys) {
            if (keys.hasOwnProperty(key)) {
                matches[key] =
                    keys[key] === SortOrderType.DESC || keys[key] === -1
                        ? -1
                        : keys[key] === SortOrderType.SKIP || keys[key] === 0
                        ? 0
                        : 1;
            }
        }

        return matches;
    }

    private deepSort(key: string, leftHand: Any, rightHand: Any, depth: number): number {
        const a: Any = this.utils.getValueByPath(leftHand, key);
        const b: Any = this.utils.getValueByPath(rightHand, key);
        return this.shallowSort(a, b, depth);
    }

    private shallowSort(a: Any, b: Any, depth?: number): number {
        const currentDepth: number = depth !== null ? depth : 1;
        b = this.utils.checkValueIsEmpty(b) ? '' : b;

        if (a === b) {
            return 0;
        }

        return a > b ? currentDepth : -1 * currentDepth;
    }

    private observeKey(keys: KeyMap<number>, count: number): string {
        let key: string;
        let size: number = 0;

        for (key in keys) {
            if (keys.hasOwnProperty(key)) {
                if (size === count) {
                    return key;
                }

                size++;
            }
        }

        return null;
    }
}

import { TableRow } from '../../interfaces/table-builder.external';
import { SortableMessage } from './sortable.interfaces';
import { Any, KeyMap } from '../../interfaces/table-builder.internal';

export function sortWorker(message: SortableMessage): TableRow[] {
    enum OrderType {
        DESC = 'desc',
        SKIP = 'skip'
    }

    function getValueByPath(object: KeyMap, path: string): KeyMap | undefined {
        return path ? path.split('.').reduce((value: string, key: string) => value && value[key], object) : object;
    }

    function checkValueIsEmpty(value: Any): boolean {
        const val: string = typeof value === 'string' ? value.trim() : value;
        return [undefined, null, NaN, '', 'null', Infinity].includes(val);
    }

    class Sortable {
        public static sortByKeys(data: TableRow[], keys: KeyMap<OrderType>): Any[] {
            const countKeys: number = Object.keys(keys).length;

            if (!countKeys) {
                return data.sort(Sortable.shallowSort);
            }

            const matches: KeyMap<number> = Sortable.getMatchesKeys(keys);
            return data.sort((a: unknown, b: unknown) => Sortable.multiSort(a, b, matches));
        }

        private static multiSort(a: unknown, b: unknown, matches: KeyMap<number>): Any {
            const countKeys: number = Object.keys(matches).length;
            let sorted: number = 0;
            let ix: number = 0;

            while (sorted === 0 && ix < countKeys) {
                const key: string = Sortable.observeKey(matches, ix);
                if (key) {
                    const depth: number = matches[key];
                    sorted = Sortable.deepSort(key, a, b, depth);
                    ix++;
                }
            }

            return sorted;
        }

        private static getMatchesKeys(keys: KeyMap<OrderType | number>): KeyMap<number> {
            const matches: KeyMap<number> = {};

            for (const key in keys) {
                if (keys.hasOwnProperty(key)) {
                    matches[key] =
                        keys[key] === OrderType.DESC || keys[key] === -1
                            ? -1
                            : keys[key] === OrderType.SKIP || keys[key] === 0
                            ? 0
                            : 1;
                }
            }

            return matches;
        }

        private static deepSort(key: string, leftHand: Any, rightHand: Any, depth: number): number {
            const a: Any = getValueByPath(leftHand, key);
            const b: Any = getValueByPath(rightHand, key);
            return this.shallowSort(a, b, depth);
        }

        private static shallowSort(a: Any, b: Any, depth?: number): number {
            const currentDepth: number = depth !== null ? depth : 1;
            b = checkValueIsEmpty(b) ? '' : b;

            if (a === b) {
                return 0;
            }

            return a > b ? currentDepth : -1 * currentDepth;
        }

        private static observeKey(keys: KeyMap<number>, count: number): string {
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

    return Sortable.sortByKeys(message.source, message.definition as any);
}

import { Any, KeyMap } from '../../interfaces/table-builder.internal';

export interface UtilsInterface {
    clone<T = Any>(obj: T): T;
    isFirefox(userAgent: string): boolean;
    checkValueIsEmpty(value: Any): boolean;
    isObject<T = object>(obj: T): boolean;
    mergeDeep(...objects: KeyMap[]): KeyMap;
    getValueByPath(object: KeyMap, path: string): KeyMap | undefined;
    readonly bodyRect: ClientRect | DOMRect;
}

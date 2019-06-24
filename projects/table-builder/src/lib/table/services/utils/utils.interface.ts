import { Any, KeyMap } from '../../interfaces/table-builder.internal';

export interface UtilsInterface {
    checkValueIsEmpty(value: Any): boolean;
    getValueByPath(object: KeyMap, path: string): KeyMap | undefined;
}

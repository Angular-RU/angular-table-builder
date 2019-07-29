import { TableRow } from '../../interfaces/table-builder.external';
import { Fn, KeyMap, MousePosition } from '../../interfaces/table-builder.internal';

export interface FilterGlobalOpts {
    value: string;
    type: FilterType;
}

export interface FilterColumnsOpts {
    isEmpty: boolean;
    values: KeyMap<string>;
    types: KeyMap<FilterType>;
}

export interface FilterableMessage {
    source: TableRow[];
    types: typeof FilterType;
    global: FilterGlobalOpts;
    columns: FilterColumnsOpts;
}

export enum FilterType {
    START_WITH = 'START_WITH',
    END_WITH = 'END_WITH',
    CONTAINS = 'CONTAINS',
    DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
    EQUALS = 'EQUALS',
    DOES_NOT_EQUAL = 'DOES_NOT_EQUAL'
}

export interface FilterEvent {
    value: string;
    type: FilterType;
}

export class FilterStateEvent {
    public key: string = null;
    public opened: boolean = null;
    public position: MousePosition = { left: null, top: null };
}

export interface FilterWorkerEvent {
    source: TableRow[];
    fireSelection: Fn;
}

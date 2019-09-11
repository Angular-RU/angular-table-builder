import { TableRow } from '../../interfaces/table-builder.external';
import { Any, MousePosition } from '../../interfaces/table-builder.internal';
export declare class ContextMenuState {
    opened: boolean;
    position: MousePosition;
    key: string;
    item: TableRow;
    value: Any;
    constructor(state?: Partial<ContextMenuState>);
}

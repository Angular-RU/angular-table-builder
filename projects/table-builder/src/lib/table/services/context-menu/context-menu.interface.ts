import { TableRow } from '../../interfaces/table-builder.external';
import { Any } from '../../interfaces/table-builder.internal';

export interface ContextMenuState {
    opened: boolean;
    position: {
        left: number;
        top: number;
    };
    key: string;
    item: TableRow;
    value: Any;
}

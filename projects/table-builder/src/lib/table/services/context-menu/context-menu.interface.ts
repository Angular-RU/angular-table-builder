import { TableRow } from '../../interfaces/table-builder.external';
import { Any } from '../../interfaces/table-builder.internal';

interface ContextMenuPosition {
    left: number;
    top: number;
}

export class ContextMenuState {
    public opened: boolean = false;
    public position: ContextMenuPosition = { left: null, top: null };
    public key: string = null;
    public item: TableRow = null;
    public value: Any = null;

    constructor(state: Partial<ContextMenuState> = null) {
        if (state) {
            this.opened = state.opened;
            this.position = state.position;
            this.key = state.key;
            this.item = state.item;
            this.value = state.value;
        }
    }
}

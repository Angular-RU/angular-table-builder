import { TableRow } from '../../interfaces/table-builder.external';
import { Any, MousePosition } from '../../interfaces/table-builder.internal';

export class ContextMenuState {
    public opened: boolean = false;
    public position: MousePosition = { left: null, top: null };
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

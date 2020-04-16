import { Any, MousePosition } from '../../interfaces/table-builder.internal';

export class ContextMenuState {
    public opened: boolean = false;
    public position: MousePosition = { left: null, top: null };
    public key: string = null;
    public item: Any = null;
    public value: Any = null;
    public textContent: string = null;

    constructor(state: ContextMenuState | null = null) {
        if (state) {
            this.opened = state.opened;
            this.position = state.position;
            this.key = state.key;
            this.item = state.item;
            this.value = state.value;
            this.textContent = state.textContent;
        }
    }
}

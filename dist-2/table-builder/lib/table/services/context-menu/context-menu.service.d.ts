import { Subject } from 'rxjs';
import { ContextMenuState } from './context-menu.interface';
import { TableRow } from '../../interfaces/table-builder.external';
export declare class ContextMenuService {
    state: Partial<ContextMenuState>;
    readonly events: Subject<void>;
    openContextMenu(event: MouseEvent, key?: string, row?: TableRow): void;
    close(): void;
}

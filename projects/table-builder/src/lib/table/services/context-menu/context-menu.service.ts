import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ContextMenuState } from './context-menu.interface';
import { TableRow } from '../../interfaces/table-builder.external';
import { getDeepValue } from '../../operators/deep-value';
import { Any } from '../../interfaces/table-builder.internal';

@Injectable()
export class ContextMenuService {
    public state: ContextMenuState = ({} as Any) as ContextMenuState;
    public readonly events: Subject<void> = new Subject();

    public openContextMenu(event: MouseEvent, key: string = null, row: TableRow = null): void {
        this.state = new ContextMenuState({
            key,
            item: row,
            opened: true,
            value: getDeepValue(row, key) || null,
            position: { left: event.clientX, top: event.clientY }
        });

        this.events.next();
        event.stopPropagation();
        event.preventDefault();
    }

    public close(): void {
        this.state = new ContextMenuState();
        this.events.next();
    }
}

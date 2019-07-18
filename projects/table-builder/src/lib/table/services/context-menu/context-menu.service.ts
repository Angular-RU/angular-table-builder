import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ContextMenuState } from './context-menu.interface';
import { TableRow } from '../../interfaces/table-builder.external';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ContextMenuService {
    public state: Partial<ContextMenuState> = {};
    public readonly events: Subject<void> = new Subject();

    constructor(private readonly utils: UtilsService) {}

    public openContextMenu($event: MouseEvent, key: string = null, row: TableRow = null): void {
        this.state = new ContextMenuState({
            key,
            item: row,
            opened: true,
            value: this.utils.getValueByPath(row, key) || null,
            position: { left: $event.clientX, top: $event.clientY }
        });

        this.events.next();
        $event.stopPropagation();
        $event.preventDefault();
    }

    public close(): void {
        this.state = new ContextMenuState();
        this.events.next();
    }
}

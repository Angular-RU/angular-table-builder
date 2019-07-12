import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ContextMenuState } from './context-menu.interface';
import { TableRow } from '../../interfaces/table-builder.external';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class ContextMenuService {
    public readonly state: Subject<ContextMenuState> = new Subject();

    constructor(private readonly utils: UtilsService) {}

    public openContextMenu($event: MouseEvent, key: string = null, item: TableRow = null): void {
        this.state.next({
            opened: true,
            key,
            item,
            value: this.utils.getValueByPath(item, key) || null,
            position: { left: $event.clientX, top: $event.clientY }
        });
        $event.stopPropagation();
        $event.preventDefault();
    }

    public close(): void {
        this.state.next({ opened: false, position: null, key: null, item: null, value: null });
    }
}

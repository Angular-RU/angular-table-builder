import { VirtualScrollerComponent } from 'ngx-virtual-scroller';
import { ChangeDetectorRef, NgZone, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TableLineRow } from '../common/table-line-row';
import { TableClickEventEmitter, TableRow } from '../../interfaces/table-builder.external';
import { SelectionService } from '../../services/selection/selection.service';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { KeyMap, RecalculatedStatus } from '../../interfaces/table-builder.internal';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { NgxContextMenuComponent } from '../../components/ngx-context-menu/ngx-context-menu.component';
import { OverloadScrollService } from '../../services/overload-scroll/overload-scroll.service';
import { UtilsService } from '../../services/utils/utils.service';
export declare class TableTbodyComponent extends TableLineRow implements OnChanges, OnInit, OnDestroy {
    selection: SelectionService;
    cd: ChangeDetectorRef;
    contextMenu: ContextMenuService;
    private readonly options;
    private readonly ngZone;
    protected readonly utils: UtilsService;
    private readonly overload;
    source: TableRow[];
    striped: boolean;
    isFirefox: boolean;
    recalculated: RecalculatedStatus;
    primaryKey: string;
    selectionEntries: KeyMap<boolean>;
    contextMenuTemplate: NgxContextMenuComponent;
    enableSelection: boolean;
    tableViewport: HTMLElement;
    columnVirtualHeight: number;
    showedCellByDefault: boolean;
    bufferAmount: number;
    scroll: VirtualScrollerComponent;
    private destroy$;
    private reloadTaskId;
    constructor(selection: SelectionService, cd: ChangeDetectorRef, contextMenu: ContextMenuService, options: TableBuilderOptionsImpl, ngZone: NgZone, utils: UtilsService, overload: OverloadScrollService);
    readonly clientBufferAmount: number;
    readonly canSelectTextInTable: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    /**
     * @description: we hove some memory leak after destroy component
     * because VirtualScrollerComponent work with requestAnimationFrame
     * invalidate cache (VirtualScrollerComponent)
     */
    ngOnDestroy(): void;
    openContextMenu(event: MouseEvent, key: string, row: TableRow): void;
    handleDblClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void;
    handleOnClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void;
    vsChange(): void;
    private refresh;
    private handleEventEmitter;
    private checkSelectedItem;
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';

import { SelectionService } from '../../services/selection/selection.service';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { UtilsService } from '../../services/utils/utils.service';
import { detectChanges } from '../../operators/detect-changes';
import { KeyMap, TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { ColumnsSchema, TableClickEventEmitter, TableEvent, TableRow } from '../../interfaces/table-builder.external';
import { getDeepValue } from '../../operators/deep-value';
import { NgxContextMenuComponent } from '../../components/ngx-context-menu/ngx-context-menu.component';

@Component({
    selector: 'ngx-table-row',
    templateUrl: './ngx-table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class NgxTableRowComponent {
    @Input() public source: TableRow[];
    @Input('cell-width') public clientColWidth: number;
    @Input('cell-height') public clientRowHeight: number;
    @Input('primary-key') public primaryKey: string;
    @Input('context-menu') public contextMenuTemplate: NgxContextMenuComponent;
    @Input('selection-entries') public selectionEntries: KeyMap<boolean>;
    @Input('enable-filtering') public enableFiltering: boolean;
    @Input('enable-selection') public enableSelection: boolean;
    @Input() public columnSchema: ColumnsSchema[];
    @Input() public item: TableRow;
    @Input() public even: boolean;
    @Input() public index: number;
    @Input() public striped: boolean;

    constructor(
        public selection: SelectionService,
        public cd: ChangeDetectorRef,
        public contextMenu: ContextMenuService,
        private readonly ngZone: NgZone,
        protected readonly utils: UtilsService
    ) {
        cd.reattach();
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    public openContextMenu(event: MouseEvent, key: string, row: TableRow): void {
        if (this.contextMenuTemplate) {
            const selectOnlyUnSelectedRow: boolean = this.enableSelection && !this.checkSelectedItem(row);

            if (selectOnlyUnSelectedRow) {
                this.selection.selectRow(row, event, this.source);
            }

            this.contextMenu.openContextMenu(event, key, row);
        }
    }

    public handleDblClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
    }

    // noinspection DuplicatedCode
    public handleOnClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        this.ngZone.runOutsideAngular(() => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout(() => {
                    this.selection.selectRow(row, event, this.source);
                    event.preventDefault();
                    detectChanges(this.cd);
                });
            }
        });

        this.handleEventEmitter(row, key, event, emitter);
    }

    public generateTableCellInfo(item: TableRow, key: string, $event: TableBrowserEvent): TableEvent {
        return {
            row: item,
            event: $event,
            value: getDeepValue(item, key),
            preventDefault: (): void => {
                window.clearInterval(this.selection.selectionTaskIdle);
            }
        };
    }

    private handleEventEmitter(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        if (emitter) {
            this.ngZone.runOutsideAngular(() => {
                window.setTimeout(() => emitter.emit(this.generateTableCellInfo(row, key, event)));
            });
        }
    }

    private checkSelectedItem(row: TableRow): boolean {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    }
}

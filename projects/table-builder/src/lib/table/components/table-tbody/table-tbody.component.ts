import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, NgZone, ViewEncapsulation } from '@angular/core';
import {
    ColumnsSchema,
    TableClickEventEmitter,
    TableEvent,
    TableRow,
    ViewPortInfo
} from '../../interfaces/table-builder.external';
import { SelectionService } from '../../services/selection/selection.service';
import { KeyMap, RecalculatedStatus, TableBrowserEvent } from '../../interfaces/table-builder.internal';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { NgxContextMenuComponent } from '../../components/ngx-context-menu/ngx-context-menu.component';
import { detectChanges } from '../../operators/detect-changes';
import { getDeepValue } from '../../operators/deep-value';

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    styles: [
        `
            table-tbody {
                display: block;
                overflow: hidden;
                position: relative;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTbodyComponent {
    @Input() public source: TableRow[];
    @Input() public striped: boolean;
    @Input('offset-top') public offsetTop: number;
    @Input('primary-key') public primaryKey: string;
    @Input() public recalculated: RecalculatedStatus;
    @Input('head-height') public headLineHeight: number;
    @Input('viewport-info') public viewportInfo: ViewPortInfo;
    @Input('enable-selection') public enableSelection: boolean;
    @Input('enable-filtering') public enableFiltering: boolean;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('selection-entries') public selectionEntries: KeyMap<boolean>;
    @Input('showed-cell-by-default') public showedCellByDefault: boolean;
    @Input('context-menu') public contextMenuTemplate: NgxContextMenuComponent;
    @Input('client-row-height') public clientRowHeight: number;
    @Input('column-schema') public columnSchema: ColumnsSchema;

    constructor(
        public selection: SelectionService,
        public cd: ChangeDetectorRef,
        public contextMenu: ContextMenuService,
        private readonly ngZone: NgZone
    ) {
        this.cd.reattach();
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

    public trackBy(index: number, row: TableRow): number {
        return row[this.primaryKey] || index;
    }

    public handleDblClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
    }

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
                window.setTimeout(() => {
                    emitter.emit(this.generateTableCellInfo(row, key, event));
                });
            });
        }
    }

    private checkSelectedItem(row: TableRow): boolean {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    }
}

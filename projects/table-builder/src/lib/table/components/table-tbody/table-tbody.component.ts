import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Inject,
    Input,
    NgZone,
    ViewEncapsulation
} from '@angular/core';

import { TableLineRow } from '../common/table-line-row';
import { TableClickEventEmitter, TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';
import { NGX_TABLE_OPTIONS } from '../../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { KeyMap, ScrollOverload } from '../../interfaces/table-builder.internal';
import { ContextMenuService } from '../../services/context-menu/context-menu.service';
import { NgxContextMenuComponent } from '../../components/ngx-context-menu/ngx-context-menu.component';
import { UtilsService } from '../../services/utils/utils.service';

const { TIME_RELOAD }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableTbodyComponent extends TableLineRow {
    @Input() public source: TableRow[];
    @Input() public striped: boolean;
    @Input() public throttling: boolean;
    @Input('scroll-overload') public scrollOverload: Partial<ScrollOverload>;
    @Input('primary-key') public primaryKey: string;
    @Input('selection-entries') public selectionEntries: KeyMap<boolean>;
    @Input('context-menu') public contextMenuTemplate: NgxContextMenuComponent;
    @Input('enable-selection') public enableSelection: boolean;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('showed-cell-by-default') public showedCellByDefault: boolean;
    @Input('buffer-amount') public bufferAmount: number;

    private taskId: number;

    constructor(
        public selection: SelectionService,
        public cd: ChangeDetectorRef,
        public contextMenu: ContextMenuService,
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        protected templateParser: TemplateParserService,
        private readonly ngZone: NgZone,
        protected readonly utils: UtilsService
    ) {
        super(templateParser, selection, utils);
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.options.bufferAmount;
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    private get canThrottling(): boolean {
        return this.scrollOverload.isOverload && this.throttling;
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

    public trackByIdx(index: number, item: TableRow): number {
        return this.canThrottling ? index : parseInt(item[this.primaryKey] as string);
    }

    public handleDblClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        window.clearInterval(this.selection.selectionTaskIdle);
        this.handleEventEmitter(row, key, event, emitter);
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

    public handleOnClick(row: TableRow, key: string, event: MouseEvent, emitter: TableClickEventEmitter): void {
        this.ngZone.runOutsideAngular(() => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout(() => {
                    this.selection.selectRow(row, event, this.source);
                    event.preventDefault();
                    this.cd.detectChanges();
                });
            }
        });

        this.handleEventEmitter(row, key, event, emitter);
    }

    public vsChange(): void {
        if (this.canThrottling && !this.enableSelection) {
            window.clearTimeout(this.taskId);
            this.taskId = window.setTimeout(() => this.update(), TIME_RELOAD);
        } else {
            this.update();
        }
    }

    private checkSelectedItem(row: TableRow): boolean {
        return this.selection.selectionModel.get(row[this.primaryKey]);
    }
}

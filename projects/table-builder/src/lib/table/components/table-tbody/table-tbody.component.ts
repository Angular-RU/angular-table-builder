import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    NgZone,
    ViewEncapsulation
} from '@angular/core';

import { TableLineRow } from '../common/table-line-row';
import { TableCellInfo, TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';
import { NGX_TABLE_OPTIONS } from '../../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { KeyMap, ScrollOverload } from '../../interfaces/table-builder.internal';
import { UtilsService } from '../../services/utils/utils.service';

const { TIME_IDLE }: typeof TableBuilderOptionsImpl = TableBuilderOptionsImpl;

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
    @Input('enable-selection') public enableSelection: boolean;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('buffer-amount') public bufferAmount: number;

    constructor(
        public selection: SelectionService,
        public cd: ChangeDetectorRef,
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        protected templateParser: TemplateParserService,
        private readonly ngZone: NgZone,
        private readonly utils: UtilsService
    ) {
        super(templateParser, selection);
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.options.bufferAmount;
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
    }

    private get canThrottling(): boolean {
        return this.scrollOverload.isOverload && !this.utils.isFirefox() && !this.enableSelection && this.throttling;
    }

    public trackByIdx(index: number, item: TableRow): number {
        return item[this.primaryKey] ? parseInt(item[this.primaryKey] as string) : index;
    }

    public handleRowIdleCallback(row: TableRow, event: MouseEvent, emitter: EventEmitter<TableCellInfo> | null): void {
        this.ngZone.runOutsideAngular(() => {
            if (this.enableSelection) {
                this.selection.selectionTaskIdle = window.setTimeout(() => {
                    this.selection.selectRow(row, event, this.source);
                    event.preventDefault();
                    this.cd.detectChanges();
                }, TIME_IDLE);
            }

            if (emitter) {
                emitter.emit(this.generateTableCellInfo(row, event));
            }
        });
    }

    public update(): void {
        if (this.canThrottling) {
            this.ngZone.runOutsideAngular(() => {
                window.clearTimeout(this.taskId);
                this.taskId = window.setTimeout(() => {
                    window.requestAnimationFrame(() => this.detectChanges());
                }, TableBuilderOptionsImpl.FRAME_TIME);
            });
        } else {
            this.detectChanges();
        }
    }
}

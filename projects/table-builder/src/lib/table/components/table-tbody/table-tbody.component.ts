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

import { TableLineRow } from '../common/table-line-row.class';
import { NGX_ANIMATION } from '../../animations/fade.animation';
import { ImplicitContext, TableCellInfo, TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';
import { SelectionService } from '../../services/selection/selection.service';
import { NGX_TABLE_OPTIONS } from '../../config/table-builder.tokens';
import { TableBuilderOptionsImpl } from '../../config/table-builder-options';
import { KeyMap } from '../../interfaces/table-builder.internal';

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [NGX_ANIMATION]
})
export class TableTbodyComponent extends TableLineRow {
    @Input() public source: TableRow[];
    @Input() public striped: boolean;
    @Input('primary-key') public primaryKey: string;
    @Input('selection-entries') public selectionEntries: KeyMap<boolean>;
    @Input('enable-selection') public enableSelection: boolean;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('buffer-amount') public bufferAmount: number;
    public contextType: typeof ImplicitContext = ImplicitContext;

    constructor(
        public selection: SelectionService,
        public cd: ChangeDetectorRef,
        @Inject(NGX_TABLE_OPTIONS) private readonly options: TableBuilderOptionsImpl,
        protected templateParser: TemplateParserService,
        private readonly ngZone: NgZone
    ) {
        super(templateParser, selection);
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.options.bufferAmount;
    }

    public get canSelectTextInTable(): boolean {
        return !this.selection.selectionStart.status;
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
                }, TableBuilderOptionsImpl.TIME_IDLE);
            }

            if (emitter) {
                emitter.emit(this.generateTableCellInfo(row, event));
            }
        });
    }
}

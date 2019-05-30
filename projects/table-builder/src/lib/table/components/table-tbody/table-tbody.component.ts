import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row.class';
import { BUFFER_AMOUNT } from '../../config/table-builder.tokens';
import { fadeAnimation } from '../../animations/fade.animation';
import { TableRow } from '../../interfaces/table-builder.external';
import { TemplateParserService } from '../../services/template-parser/template-parser.service';

@Component({
    selector: 'table-tbody',
    templateUrl: './table-tbody.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: [fadeAnimation]
})
export class TableTbodyComponent extends TableLineRow {
    @Input() public source: TableRow[];
    @Input('primary-key') public primaryKey: string;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('buffer-amount') public bufferAmount: number;

    constructor(
        @Inject(BUFFER_AMOUNT) public defaultBufferAmount: number,
        protected templateParser: TemplateParserService
    ) {
        super(templateParser);
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.defaultBufferAmount;
    }

    public trackByIdx(index: number, item: TableRow): number {
        return item[this.primaryKey] ? parseInt(item[this.primaryKey]) : index;
    }
}

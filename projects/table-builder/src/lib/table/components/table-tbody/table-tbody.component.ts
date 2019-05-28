import { ChangeDetectionStrategy, Component, Inject, Input, ViewEncapsulation } from '@angular/core';

import { TableLineRow } from '../common/table-line-row.class';
import { ScrollStatus, TableRow } from '../../../table-builder.interfaces';
import { BUFFER_AMOUNT } from '../../../table-builder.tokens';
import { fadeAnimation } from '../../core/fade.animation';

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
    @Input('scroll-status') public scrollStatus: ScrollStatus;
    @Input('table-viewport') public tableViewport: HTMLElement;
    @Input('column-virtual-height') public columnVirtualHeight: number;
    @Input('buffer-amount') public bufferAmount: number;

    constructor(@Inject(BUFFER_AMOUNT) public defaultBufferAmount: number) {
        super();
    }

    public get clientBufferAmount(): number {
        return Number(this.bufferAmount) || this.defaultBufferAmount;
    }

    public trackByIdx(index: number, item: TableRow): number {
        return item[this.primaryKey] ? item[this.primaryKey] : index;
    }
}

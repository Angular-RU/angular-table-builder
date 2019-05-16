import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'table-row',
    templateUrl: './table-row.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TableRowComponent {
    @Input() public text: string;
    @Input() public bold: boolean;
    @Input() public cellFullWidth: boolean;
    @Input() public fixed: boolean;
    @Input() public rowHeight: string;
    @Input() public cellWidth: string;
}
